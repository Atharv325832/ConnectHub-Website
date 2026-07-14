const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true

        },

        icon: {
            type: String,
            default: ""
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "auth"
            }
        ],

        channels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Channel"
            }
        ],

        inviteCode: {
            type: String,
            unique: true,
            default: () => Math.random().toString(36).substring(2, 8)
        }
    },
    {
        timestamps: true
    });

const Server = mongoose.models.Server || mongoose.model('Server', serverSchema);
module.exports = {Server};
