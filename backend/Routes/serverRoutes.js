const express = require("express");
const router = express.Router();
const { createServer, getServer } = require("../controllers/serverController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");



router.post("/create-server", authMiddleware, upload.single("icon"), createServer);
router.get("/get-server", authMiddleware, getServer);

module.exports = router;