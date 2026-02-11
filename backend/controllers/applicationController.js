const Application = require("../models/Application");
const Job = require("../models/Job");
const Resume = require("../models/Resume");

// Apply for Job (Job Seeker only)
const applyForJob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;

    if (!jobId || !resumeId) {
      return res.status(400).json({ message: "Job ID and resume ID are required" });
    }

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found or inactive" });
    }

    // Check if resume exists and belongs to user
    const resume = await Resume.findById(resumeId);
    if (!resume || resume.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: {
        fileName: resume.fileName,
        filePath: resume.filePath,
      },
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Applications by Job (Employer only, for their jobs)
const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job belongs to employer
    const job = await Job.findById(jobId);
    if (!job || job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view applications for this job" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "fullName email phone location bio skills experience education")
      .sort({ createdAt: -1 });

    // Format the response to include resume object
    const formattedApplications = applications.map(app => ({
      _id: app._id,
      createdAt: app.createdAt,
      status: app.status === 'Applied' ? 'Under Review' : app.status,
      applicant: app.applicant,
      resume: app.resume,
    }));

    res.json(formattedApplications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get My Applications (Job Seeker only)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "title companyName location salary jobType")
      .sort({ appliedAt: -1 });

    // Map status for consistency
    const formattedApplications = applications.map(app => ({
      ...app.toObject(),
      status: app.status === 'Applied' ? 'Under Review' : app.status,
    }));

    res.json(formattedApplications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Application Status (Employer only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Applied", "Under Review", "Shortlisted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the application
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if the job belongs to the employer
    const job = await Job.findById(application.job);
    if (!job || job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    // Update status
    application.status = status;
    await application.save();

    res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyForJob,
  getApplicationsByJob,
  getMyApplications,
  updateApplicationStatus,
};
