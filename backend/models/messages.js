const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        public_id: { type: String },
        name: { type: String, required: true },
        type: { type: String, required: true },
        size: { type: Number, required: true },
    },
    { _id: false }
);

const reactionSchema = new mongoose.Schema({
    emoji: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    }]
}, { _id: false });

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        },

        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            required: true
        },
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },
        edited: {
            type: Boolean,
            default: false
        },
        attachments: {
            type: [attachmentSchema],
            default: [],
        },
        reactions: [reactionSchema],

        deleted: {
            type: Boolean,
            default: false
        }


    },
    {
        timestamps: true
    });


const DmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }

}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
const Dm = mongoose.model("Dm", DmSchema);

module.exports = { Message, Dm };
