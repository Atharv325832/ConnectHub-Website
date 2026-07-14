const express = require("express");
const { sendMessageController, getMessages } = require("../controllers/sendMessageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/channels/:channelId/messages", authMiddleware, sendMessageController);
router.get("/channels/:channelId/messages", authMiddleware,getMessages);


module.exports = router;