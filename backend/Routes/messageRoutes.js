const express = require("express");
const { sendMessageController,
    getMessages,
    editMessage,
    deleteMessage,
    emojiController } = require("../controllers/MessageController");
    
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/channels/:channelId/messages", authMiddleware, sendMessageController);
router.get("/channels/:channelId/messages", authMiddleware, getMessages);
router.patch("/messages/:id", authMiddleware, editMessage);
router.delete("/messages/:id", authMiddleware, deleteMessage);
router.patch("/messages/:id/reaction", authMiddleware, emojiController);

module.exports = router;