const express = require("express");
const router = express.Router();
const { upload, uploadResume, getMyResumes } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Upload resume (Job Seeker only)
router.post("/upload", authMiddleware.protect, roleMiddleware(["jobseeker"]), upload.single("resume"), uploadResume);

// Get my resumes (Job Seeker only)
router.get("/my", authMiddleware.protect, roleMiddleware(["jobseeker"]), getMyResumes);

module.exports = router;
