const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    joinByCode, getInvite, joinByInviteLink
    
} = require("../controllers/inviteController");

router.post("/code/:code", authMiddleware, joinByCode);

router.get("/link/:code", authMiddleware, getInvite);

router.post("/link/:code", authMiddleware, joinByInviteLink);


module.exports = router;