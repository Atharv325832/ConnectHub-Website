require('dotenv').config();
const {app,port} = require('./app.js');
const connectDB = require('./config/db.js');
const mongoose=require("mongoose")

connectDB();

console.log("THIS IS SERVER");

console.log("Connected DB:", mongoose.connection.name);
console.log("URI:", process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})