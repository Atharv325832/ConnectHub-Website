const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    sendInviteRequest,
    getReceivedInvites,
    getSentInvites,
    acceptInvite,
    rejectInvite
} = require("../controllers/inviteRequestController");

router.post("/send", authMiddleware, sendInviteRequest);

router.get("/received", authMiddleware, getReceivedInvites);

router.get("/sent", authMiddleware, getSentInvites);

router.post("/:id/accept", authMiddleware, acceptInvite);

router.post("/:id/reject", authMiddleware, rejectInvite);

module.exports = router;