const mongoose = require("mongoose");

const registerSchema=new mongoose.Schema({
    username :{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true
        
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

    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

   
},
{
    timestamps: true
});

const messageSchema=new mongoose.Schema(
{
    content: {
        type: String,
        required: true,
        trim: true
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
    edited:{
        type: Boolean,
        default: false
    },
    attachments: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
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
    
},{
    timestamps: true
});


    const Message = mongoose.model("Message", messageSchema);
    const Channel = mongoose.model("Channel", ChannelSchema);
    const Dm = mongoose.model("Dm", DmSchema);
    const Server = mongoose.model("Server", serverSchema);
    const Blacklist = mongoose.model("Blacklist", blacklistSchema);
    const authmodel = mongoose.model("auth",registerSchema);

          module.exports = { authmodel, Blacklist, Server, Message, Channel, Dm };


