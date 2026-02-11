const express = require("express");
const { createJob, getAllJobs, getJobsByEmployer, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Protected routes
router.post("/", protect, roleMiddleware("employer"), createJob);
router.get("/", protect, getAllJobs);
router.get("/employer", protect, roleMiddleware("employer"), getJobsByEmployer);
router.delete("/:id", protect, roleMiddleware("employer"), deleteJob);

module.exports = router;
