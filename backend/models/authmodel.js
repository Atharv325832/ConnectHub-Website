const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

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

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            default: ""
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
const Channel = mongoose.model("Channel", ChannelSchema);
const Dm = mongoose.model("Dm", DmSchema);
const Server = mongoose.model("Server", serverSchema);
const Blacklist = mongoose.model("Blacklist", blacklistSchema);
const authmodel = mongoose.model("auth", registerSchema);

module.exports = { authmodel, Blacklist, Server, Message, Channel, Dm };


