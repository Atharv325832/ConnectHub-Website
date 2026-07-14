const { Server } = require("../models/Server");
const {Invite} = require("../models/invite")
const uploadImage = require("../utils/utilUpload");
const generateInviteCode = require("../utils/generateInviteCode");


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
        const invite_code = generateInviteCode();

        const server = await Server.create({
            name,
            owner: req.user.id,
            icon: iconUrl,
            members: [req.user.id],
            channels: [],
            inviteCode: invite_code,
        });
        await Invite.create({
            type: "server",
            code:invite_code,
            server: server._id,
            createdBy: req.user.id
        })
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