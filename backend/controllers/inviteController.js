const {Server} = require("../models/server");
const {Invite} = require("../models/invite");
const {Channel} = require("../models/channel");

const joinByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const userId = req.user.id;

        const server = await Server.findOne({ inviteCode: code });

        if (!server) {
            return res.status(404).json({
                success: false,
                message: "Invalid invite code"
            });
        }

        const alreadyMember = server.members.some(
            member => member.toString() === userId
        );

        if (alreadyMember) {
            return res.status(400).json({
                success: false,
                message: "You are already a member."
            });
        }

        server.members.push(userId);

        await server.save();

        res.status(200).json({
            success: true,
            message: "Joined server successfully.",
            server
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getInvite = async (req, res) => {

    try {

        const { code } = req.params;
        
        const invite = await Invite.findOne({
            code,
            active: true
        })
            .populate("server", "name icon")
            .populate("channel", "name");
        if (!invite) {

            return res.status(404).json({
                success: false,
                message: "Invite not found"
            });

        }

        if (invite.expiresAt && invite.expiresAt < new Date()) {

            return res.status(400).json({
                success: false,
                message: "Invite expired"
            });

        }

        if (
            invite.maxUses > 0 &&
            invite.usedCount >= invite.maxUses
        ) {

            return res.status(400).json({
                success: false,
                message: "Invite has reached maximum usage."
            });

        }

        res.json({
            success: true,
            invite
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const joinByInviteLink = async (req, res) => {

    try {

        const userId = req.user.id;
        const { code } = req.params;

        const invite = await Invite.findOne({
            code,
            active: true
        });

        if (!invite) {

            return res.status(404).json({
                success: false,
                message: "Invalid invite."
            });

        }

        if (invite.expiresAt && invite.expiresAt < new Date()) {

            return res.status(400).json({
                success: false,
                message: "Invite expired."
            });

        }

        if (
            invite.maxUses > 0 &&
            invite.usedCount >= invite.maxUses
        ) {

            return res.status(400).json({
                success: false,
                message: "Invite usage exceeded."
            });

        }

        const server = await Server.findById(invite.server);

        if (!server) {

            return res.status(404).json({
                success: false,
                message: "Server not found."
            });

        }

        const member = server.members.some(
            m => m.toString() === userId
        );

        if (!member) {

            server.members.push(userId);

            await server.save();

        }

        if (invite.type === "channel" && invite.channel) {

            const channel = await Channel.findById(invite.channel);

            if (channel) {

                const exists = channel.members.some(
                    m => m.toString() === userId
                );

                if (!exists) {

                    channel.members.push(userId);

                    await channel.save();

                }

            }

        }

        invite.usedCount++;

        await invite.save();

        res.json({
            success: true,
            message: "Joined successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    joinByCode, getInvite, joinByInviteLink
};