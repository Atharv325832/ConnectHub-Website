const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./routes/AuthRoutes");
const serverRoutes = require("./routes/serverRoutes");
const channelRoutes= require("./routes/channelRoutes");

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


module.exports = { app, port };
