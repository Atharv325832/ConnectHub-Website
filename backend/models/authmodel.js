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

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
const authmodel = mongoose.model("auth", registerSchema);

module.exports = { authmodel, Blacklist};


