const { Message } = require("../models/messages");
const { Channel } = require("../models/channel");
const { Server } = require("../models/server");
const { getIO } = require("../socket");
const cloudinary = require("../config/cloudinary");

const sendMessageController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content, replyTo, attachments } = req.body;
        console.log(req.body);

        if (!content || content.trim() === "" && (!attachments || attachments.length === 0)) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty",
            });
        }

        const channel = await Channel.findById(channelId).populate("Server");
        console.log(channel);
        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
            });
        }

        const isMember = channel.Server.members.some(
            member => member.equals(req.user._id)
        );
        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this server."
            });
        }

        const message = await Message.create({
            content,
            sender: req.user._id,
            channel: channelId,
            replyTo: replyTo || null,
            attachments,
        });

        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "username")
            .populate("channel", "name").populate({
                path: "replyTo",
                populate: {
                    path: "sender",
                    select: "username avatar"
                }
            });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: populatedMessage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;

        const messages = await Message.find({ channel: channelId })
            .populate("sender", "username")
            .populate({
                path: "replyTo",
                populate: {
                    path: "sender",
                    select: "username avatar"
                }
            })
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch messages",
        });
    }
};

const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        // Only sender can edit
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You cannot edit this message"
            });
        }

        // Don't edit deleted messages
        if (message.deleted) {
            return res.status(400).json({
                message: "Message has been deleted"
            });
        }
        message.content = content;
        message.edited = true;
        await message.save();
        await message.populate("sender", "username avatar");

        getIO().to(message.channel.toString()).emit("messageEdited", message);

        return res.status(200).json({
            message: "Message edited successfully",
            data: message
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        // Only sender can delete
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You cannot delete this message"
            });
        }
        message.deleted = true;
        message.content = "This message was deleted.";
        for (const file of message.attachments) {
            if (file.public_id) {
                await cloudinary.uploader.destroy(file.public_id);
            }
        }
        message.attachments = [];

        await message.save();
        await message.populate("sender", "username avatar");

        getIO().to(message.channel.toString()).emit("messageDeleted", message);

        return res.status(200).json({
            message: "Message deleted successfully",
            data: message
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const emojiController = async (req, res) => {
    try {
        const { id } = req.params;
        const { emoji } = req.body;
        const userId = req.user._id;

        if (!emoji) {
            return res.status(400).json({
                message: "Emoji is required"
            });
        }
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        const reaction = message.reactions.find(
            r => r.emoji === emoji
        );

        if (!reaction) {
            message.reactions.push({
                emoji,
                users: [userId]
            });
        } else {
            const alreadyReacted = reaction.users.some(
                user => user.toString() === userId.toString()
            );

            if (alreadyReacted) {
                reaction.users = reaction.users.filter(
                    user => user.toString() !== userId.toString()
                );
                if (reaction.users.length === 0) {
                    message.reactions = message.reactions.filter(
                        r => r.emoji !== emoji
                    );
                }

            } else {
                reaction.users.push(userId);
            }
        }

        await message.save();
        console.log(message.reactions);

        const updatedMessage = await Message.findById(id)
            .populate("sender", "username")
            .populate("replyTo")
            .populate("reactions.users", "username");
        const io = getIO();

        io.to(message.channel.toString()).emit(
            "reactionUpdated",
            updatedMessage
        );

        return res.status(200).json({
            message: "Reaction updated",
            data: updatedMessage
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    sendMessageController,
    getMessages,
    editMessage,
    deleteMessage,
    emojiController
}