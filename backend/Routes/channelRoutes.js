const express = require("express");
const router = express.Router();
const { createChannel,getChannels,deleteChannel,updateChannel } = require("../controllers/channelController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/channels", authMiddleware, createChannel);
router.get("/channels/:server_id",authMiddleware,getChannels);
router.delete("/channel/:id",authMiddleware,deleteChannel);
router.patch("/channel/:id", authMiddleware, updateChannel);

module.exports = router;