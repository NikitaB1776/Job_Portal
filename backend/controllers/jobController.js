const Job = require("../models/Job");
const User = require("../models/user");

// Create Job (Employer only)
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, jobType, experienceLevel, skills } = req.body;

    if (!title || !description || !location || !salary || !jobType || !experienceLevel) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!user.companyName) {
      return res.status(400).json({ message: "Company name is required in your profile. Please update your employer profile." });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      jobType,
      companyName: user.companyName,
      experienceLevel,
      skills: skills || [],
      employer: req.user.id,
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Jobs (For job seekers)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate("employer", "fullName companyName");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Jobs by Employer (Employer dashboard)
const getJobsByEmployer = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });

    // Add applicant count to each job
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await require("../models/Application").countDocuments({ job: job._id });
        return {
          ...job.toObject(),
          applicants: applicantCount
        };
      })
    );

    res.json(jobsWithApplicants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Job (Employer who created it)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobsByEmployer,
  deleteJob,
};
