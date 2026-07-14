const express = require("express");
const mongoose =require("mongoose")
const {authmiddleware} = require("../middleware/authMiddleware");
const { authmodel, Blacklist } = require("../models/authmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req,res){
    const {username,email,password} = req.body;


console.log("Request Body:", req.body);

const userExist = await authmodel.findOne({ username });
if(userExist){
    res.status(401).json({
      message: " User already exists"
    })
}

const emailExist = await authmodel.findOne({ email });
if(emailExist){
    res.status(401).json({
      message: " Email already exists"
    })
}
console.log("emailExist:", emailExist);
    const hashedPassword = await bcrypt.hash(password,10);

const newUser = await authmodel.create({
    username,
    email,
    password: hashedPassword
});
const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
   res.cookie("token", token, {
    httpOnly: true,
    secure: false,      
    sameSite: "lax",
});
    
    res.status(201).json({message:"User created successfully", token});
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUser(req,res){
    const {username,password} = req.body;
    /* console.log("Login Body:", req.body);
     const user = await authmodel.findOne({ username });
     console.log("Found User:", user);*/
     console.log("Login Body:", req.body);
     console.log("Connected DB:", mongoose.connection.name);
console.log("URI:", process.env.MONGO_URI);

const users = await authmodel.find({});
console.log(users);

const user = await authmodel.findOne({ username: req.body.username });
console.log("Found User:", user);
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

   res.cookie("token", token, {
    httpOnly: true,
    secure: false,     
    sameSite: "lax",
});
    res.status(200).json({message:"Login successful", token});
}

/**
 * @desc Get the currently logged-in user
 * @route GET /api/auth/me
 */
async function getMe(req,res){
    const user = await authmodel.findById(req.user.id).select("-password");
    res.status(200).json(user);
}

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 */
async function logoutUser(req,res){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(400).json({message:"No token found"});
    }
    const blacklistedToken = await Blacklist.create({ token });

    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({message:"Logout successful"});
}

module.exports = {registerUser,loginUser,getMe,logoutUser};

