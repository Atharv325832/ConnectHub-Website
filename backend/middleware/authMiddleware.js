const jwt = require("jsonwebtoken");
const {authmodel} = require("../models/authmodel");


const authMiddleware = async (req, res, next) => {
    try {
        console.log("Cookie:", req.cookies);

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        const user = await authmodel.findById(decoded.id).select("-password");
        console.log("User:", user);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: err.message,
        });
    }
};
module.exports = authMiddleware

