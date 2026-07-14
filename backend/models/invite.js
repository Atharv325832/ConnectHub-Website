const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
    {
        // server or channel invite
        type: {
            type: String,
            enum: ["server", "channel"],
            required: true
        },

        // Invite code
        code: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        // Server being invited to
        server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Server",
            required: true
        },

        // Only required for channel invite
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            default: null
        },

        // User who created invite
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },

        // Invite settings
        maxUses: {
            type: Number,
            default: 0 // 0 = unlimited
        },

        usedCount: {
            type: Number,
            default: 0
        },

        expiresAt: {
            type: Date,
            default: null
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

inviteSchema.index({ code: 1 });
const Invite = mongoose.model("Invite", inviteSchema);
module.exports = {Invite};