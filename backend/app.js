const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./routes/AuthRoutes");
const serverRoutes = require("./routes/serverRoutes");
const channelRoutes= require("./routes/channelRoutes");
const inviteRoutes = require("./routes/inviteRoutes")
const inviteRequestRoutes = require("./routes/inviteRequestRoutes")
const getMembersRoutes =require("./routes/getMembersRoutes")
const messageRoutes =require("./routes/messageRoutes")
const searchUsers=require("./routes/searchUsers")
const uploadRoutes=require("./routes/uploadRoutes")

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api', serverRoutes);
app.use('/api',channelRoutes);
app.use('/api/invite',inviteRoutes);
app.use('/api/invite',inviteRequestRoutes);
app.use('/api/servers',getMembersRoutes);
app.use('/api',messageRoutes);
app.use('/api/users',searchUsers);
app.use('/api',uploadRoutes)

module.exports = { app, port };
