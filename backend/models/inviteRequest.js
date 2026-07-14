const mongoose = require("mongoose");

const inviteRequestSchema = new mongoose.Schema(
    {
        // Invite Type
        type: {
            type: String,
            enum: ["server", "channel"],
            required: true
        },

        // Sender
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },

        // Receiver
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },

        // Server
        server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Server",
            required: true
        },

        // Optional
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            default: null
        },

        // Invite status
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        },

        // Optional message
        message: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate pending invite
inviteRequestSchema.index(
    {
        sender: 1,
        receiver: 1,
        server: 1,
        channel: 1,
        status: 1
    },
    {
        unique: true,
        partialFilterExpression: {
            status: "pending"
        }
    }
);

const InviteRequest = mongoose.model("InviteRequest", inviteRequestSchema);
module.exports = {InviteRequest}