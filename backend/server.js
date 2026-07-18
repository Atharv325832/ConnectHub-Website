require("dotenv").config();

const { app, port } = require("./app");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const socketAuth = require("./middleware/socketAuth");

const socketHandler = require("./socketHandler");

const { setIO } = require("./socket");

connectDB();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

setIO(io);

io.use(socketAuth);

socketHandler(io);

httpServer.listen(port, () => {
    console.log(`Server is running on ${port}`);
});