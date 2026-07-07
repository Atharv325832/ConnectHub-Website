const { Server } = require("../models/authmodel");
const uploadImage = require("../utils/utilUpload");


const createServer = async (req, res) => {
    try {
        console.log("ENTER CONTROLLER");
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Server name is required",
            });
        }
        let iconUrl = "";
        if (req.file) {
            const result = await uploadImage(
                req.file.buffer,
                "connecthub/servers"
            );
            iconUrl = result.secure_url;
        }
        const server = await Server.create({
            name,
            owner: req.user.id,
            icon: iconUrl,
            members: [req.user.id],
            channels: [],
            inviteCode: Math.random().toString(36).substring(2, 8),
        });
        return res.status(201).json(server);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getServer = async (req, res) => {
    const id = req.user.id;
    try {
        const servers = await Server.find({
            $or: [
                { owner: id },
                { members: id }
            ]
        }).sort({ createdAt: -1 });
        return res.status(200).json(servers);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    createServer,
    getServer,
};