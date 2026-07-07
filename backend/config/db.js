const mongoose = require("mongoose");

const connectDb =async () => {
    try {
       
        await mongoose.connect(process.env.MONGO_URI);
     

console.log("Connected DB:", mongoose.connection.name);
    } catch (err) {
        console.error("MongoDB Error:", err);
        process.exit(1);
    }
};

module.exports = connectDb;