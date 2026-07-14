require('dotenv').config();
const { app, port } = require('./app.js');
const connectDB = require('./config/db.js');
const mongoose = require("mongoose")
const http = require("http");
const { Server } = require("socket.io");
const { Message } = require("./models/messages");
const socketAuth = require("./middleware/socketAuth.js")

connectDB();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  socket.on("sendMessage", async (data) => {
    try {
      console.log("Creating message...");

      const message = await Message.create({
        content: data.content,
        sender: socket.user._id,
        channel: data.channelId,
      });

      console.log("Message saved:", message);

      const populated = await Message.findById(message._id)
        .populate("sender", "username avatar")
        .populate("channel", "name");

      io.to(data.channelId).emit("newMessage", populated);

      console.log("Message emitted");
    } catch (err) {
      console.error("Socket sendMessage error:", err);
    }
  });
  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    console.log(`${socket.id} joined channel ${channelId}`);
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
    console.log("User Disconnected:", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});