const express=require("express")
const router=express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getMembersController} =require("../controllers/getMembersController")


router.get("/:serverId/members",authMiddleware , getMembersController);


module.exports=router;