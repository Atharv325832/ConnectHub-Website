const mongoose = require("mongoose");

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
        attachments: [
            {
                url: String,
                type: String,
                size: Number,
                name: String
            }
        ],
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

module.exports = {Message, Dm };
