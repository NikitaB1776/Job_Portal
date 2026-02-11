const express = require("express");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/profile - Get user profile
router.get("/", authMiddleware.protect, profileController.getProfile);

// PUT /api/profile - Update user profile
router.put("/", authMiddleware.protect, profileController.updateProfile);

// POST /api/profile/upload-resume - Upload resume
router.post("/upload-resume", authMiddleware.protect, profileController.upload.single('resume'), profileController.uploadResume);

module.exports = router;
