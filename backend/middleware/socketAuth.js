const jwt = require("jsonwebtoken");
const { authmodel } = require("../models/authmodel");
const cookie = require("cookie");

const socketAuth = async (socket, next) => {
    try {
        const cookies = cookie.parseCookie(socket.handshake.headers.cookie || "");
        const token = cookies.token;
        console.log("Cookies:", cookies);
        console.log("Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await authmodel
            .findById(decoded.id)
            .select("-password");

        socket.user = user;

        next();

    } catch (err) {
        next(err);
    }
};

module.exports = socketAuth;