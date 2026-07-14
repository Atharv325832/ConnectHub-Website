const { InviteRequest } = require("../models/InviteRequest");
const { Server } = require("../models/Server");
const { Channel } = require("../models/Channel");
const { authmodel } = require("../models/authmodel");
// ======================================================
// Send Invite Request
// ======================================================

const sendInviteRequest = async (req, res) => {
    try {

        const senderId = req.user.id;

        const {
            receiverId,
            serverId,
            channelId,
            type
        } = req.body;

        if (!receiverId || !serverId || !type) {
            return res.status(400).json({
                success: false,
                message: "receiverId, serverId and type are required."
            });
        }

        if (!["server", "channel"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid invite type."
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot invite yourself."
            });
        }

        // Check receiver exists
        const receiver = await authmodel.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found."
            });
        }

        // Check server exists
        const server = await Server.findById(serverId);

        if (!server) {
            return res.status(404).json({
                success: false,
                message: "Server not found."
            });
        }

        // Sender should belong to server
        const senderIsMember =
            server.owner.toString() === senderId ||
            server.members.some(member => member.toString() === senderId);

        if (!senderIsMember) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this server."
            });
        }

        // Receiver already joined?
        const alreadyMember =
            server.owner.toString() === receiverId ||
            server.members.some(member => member.toString() === receiverId);

        if (alreadyMember) {
            return res.status(400).json({
                success: false,
                message: "User is already a member."
            });
        }

        // Channel validation
        if (type === "channel") {
            if (!channelId) {
                return res.status(400).json({
                    success: false,
                    message: "channelId is required."
                });
            }
            const channel = await Channel.findById(channelId);

            if (!channel) {
                return res.status(404).json({
                    success: false,
                    message: "Channel not found."
                });
            }
        }

        // Duplicate pending invite
        const existingInvite = await InviteRequest.findOne({
            sender: senderId,
            receiver: receiverId,
            server: serverId,
            channel: channelId || null,
            status: "pending"
        });

        if (existingInvite) {
            return res.status(400).json({
                success: false,
                message: "Invite already sent."
            });
        }

        const invite = await InviteRequest.create({
            type,
            sender: senderId,
            receiver: receiverId,
            server: serverId,
            channel: channelId || null,
            message: ""
        });

        res.status(201).json({

            success: true,
            message: "Invite sent successfully.",

            invite
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Accept Invite
// ======================================================

const acceptInvite = async (req, res) => {
    try {
        const inviteId = req.params.id;
        const userId = req.user.id;
        const invite = await InviteRequest.findById(inviteId);
        if (!invite) {
            return res.status(404).json({
                success: false,
                message: "Invite not found."
            });
        }

        // Only receiver can accept
        if (invite.receiver.toString() !== userId) {
            return res.status(403).json({

                success: false,

                message: "Unauthorized."

            });

        }

        if (invite.status !== "pending") {
            return res.status(400).json({

            success: false,
                message: "Invite already processed."

            });
        }

        const server = await Server.findById(invite.server)
        if (!server) {
            return res.status(404).json({

                success: false,

                message: "Server not found."

            });
        }

        const memberExists =
            server.owner.toString() === userId ||
            server.members.some(member => member.toString() === userId);
        if (!memberExists) {
            server.members.push(userId);
            await server.save();
        }

        // Add to channel if needed
        if (invite.type === "channel" && invite.channel) {
            const channel = await Channel.findById(invite.channel);
            if (channel) {
                const exists = channel.members.some(
                    member => member.toString() === userId
                );
                if (!exists) {
                    channel.members.push(userId);
                    await channel.save();
                }
            }
        }
        invite.status = "accepted";
        await invite.save();
        res.status(200).json({
            success: true,
            message: "Invite accepted."
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ======================================================
// Reject Invite
// ======================================================
const rejectInvite = async (req, res) => {
    try {
        const inviteId = req.params.id;
        const userId = req.user.id;
        const invite = await InviteRequest.findById(inviteId);
        if (!invite) {
            return res.status(404).json({
                success: false,
                message: "Invite not found."
            });
        }

        if (invite.receiver.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });
        }

        if (invite.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Invite already processed."
            });

        }
        invite.status = "rejected";
        await invite.save();
        res.status(200).json({
            success: true,
            message: "Invite rejected."
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

const getReceivedInvites = async (req, res) => {
    try {
        const userId = req.user.id;
        const invites = await InviteRequest.find({
            receiver: userId
        })
            .populate("sender", "username email")
            .populate("server", "name icon")
            .populate("channel", "name type")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: invites.length,
            invites
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Get Sent Invites
// GET /api/invite-request/sent
// ======================================================
const getSentInvites = async (req, res) => {
    try {
        const userId = req.user.id;
        const invites = await InviteRequest.find({
            sender: userId
        })
            .populate("receiver", "username email")
            .populate("server", "name icon")
            .populate("channel", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invites.length,
            invites
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    sendInviteRequest,
    acceptInvite,
    rejectInvite,
    getReceivedInvites,
    getSentInvites
};