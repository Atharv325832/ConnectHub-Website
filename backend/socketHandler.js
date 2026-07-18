const { Message } = require("./models/messages");
console.log(Message.schema.path("attachments"));
const onlineUsers = new Map();

const socketHandler = (io) => {
    io.on("connection", (socket) => {

        socket.on("userOnline", (userId) => {
            onlineUsers.set(userId, socket.id);

            socket.emit("onlineUsers", [...onlineUsers.keys()]);
            socket.broadcast.emit("userOnline", userId);
        });

        socket.on("sendMessage", async (data) => {
            try {
                console.log(data);
                console.log("Received data:", data);
                console.log("Attachments:", data.attachments);
                console.log("First attachment:", data.attachments?.[0]);
                console.log("Type:", typeof data.attachments?.[0]);
                const message = await Message.create({
                    content: data.content,
                    sender: socket.user._id,
                    channel: data.channelId,
                    replyTo: data.replyTo || null,
                    attachments: data.attachments || [],
                });

                const populated = await Message.findById(message._id)
                    .populate("sender", "username avatar")
                    .populate("channel", "name")
                    .populate({
                        path: "replyTo",
                        populate: {
                            path: "sender",
                            select: "username avatar"
                        }
                    });
                console.log(populated);

                io.to(data.channelId).emit("newMessage", populated);

            } catch (err) {
                console.error(err);
            }
        });

        socket.on("joinChannel", (channelId) => {
            socket.join(channelId);
            console.log(`${socket.id} joined ${channelId}`);
        });

        socket.on("typing", ({ channelId, username }) => {
            socket.to(channelId).emit("userTyping", {
                username,
            });
        });

        socket.on("stopTyping", ({ channelId }) => {
            socket.to(channelId).emit("userStoppedTyping");
        });

        socket.on("disconnect", () => {
            let disconnectedUser = null;

            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    disconnectedUser = userId;
                    onlineUsers.delete(userId);
                    break;
                }
            }
            if (disconnectedUser) {
                io.emit("userOffline", disconnectedUser);
            }

        });
    });
};

module.exports = socketHandler;