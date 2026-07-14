const {Server} = require("../models/server");
const getMembersController = async (req, res) => {
    try {
        const { serverId } = req.params;

        const server = await Server.findById(serverId)
            .populate("members", "username avatar email");

        if (!server) {
            return res.status(404).json({
                message: "Server not found",
            });
        }

        res.status(200).json(server.members);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
module.exports = { getMembersController}
    