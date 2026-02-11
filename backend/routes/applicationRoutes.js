const express = require("express");
const { applyForJob, getApplicationsByJob, getMyApplications, updateApplicationStatus } = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Protected routes
router.post("/apply", protect, roleMiddleware("jobseeker"), applyForJob);
router.get("/job/:jobId", protect, roleMiddleware("employer"), getApplicationsByJob);
router.get("/my", protect, roleMiddleware("jobseeker"), getMyApplications);
router.put("/:applicationId/status", protect, roleMiddleware("employer"), updateApplicationStatus);

module.exports = router;
