const {authmodel} = require("../models/authmodel");

const searchUsersController = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.json([]);
        }

        const users = await authmodel.find({
            username: {
                $regex: q,
                $options: "i",
            },
            _id: {
                $ne: req.user._id,
            },
        }).select("_id username avatar");

        res.json(users);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    searchUsersController,
};