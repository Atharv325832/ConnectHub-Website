const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: ['text', 'voice'],
            default: 'text'
        },
        
        topic: {
            type: String,
            default: ""
        },

        isPrivate: {
            type: Boolean,
            default: false
        },

        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth"
        }],

        Server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Server",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },
    },
    {
        timestamps: true
    });
ChannelSchema.index({ Server: 1, name: 1 }, { unique: true });

const Channel = mongoose.models.Channel ||mongoose.model("Channel", ChannelSchema);
module.exports = {Channel};
