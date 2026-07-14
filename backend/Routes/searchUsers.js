const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { searchUsersController } = require("../controllers/searchUsersController");

router.get("/search", authMiddleware, searchUsersController);

module.exports = router;