const { Message } = require("../models/messages");
const { Channel } = require("../models/channel");
const { Server } = require("../models/server");

const sendMessageController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content } = req.body;
        console.log(req.body);

        if (!content || content.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty",
            });
        }

        const channel = await Channel.findById(channelId)
            .populate("Server");
        console.log(channel);
        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
            });
        }
        console.log(channel);
        console.log(channel.Server);
        const isMember = channel.Server.members.some(
            member => member.equals(req.user._id)
        );
        console.log("Logged in user:", req.user._id);
        console.log("Logged in user:", req.user._id);
        console.log("Server owner:", channel.Server.owner);
        console.log("Server members:", channel.Server.members)
        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this server."
            });
        }

        const message = await Message.create({
            content,
            sender: req.user._id,
            channel: channelId,
        });

        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "username")
            .populate("channel", "name");

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
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

module.exports = {
    sendMessageController,
    getMessages
}