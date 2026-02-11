const User = require("../models/user");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, location, bio, skills, experience, education, resume,
            companyName, companyDescription, companyWebsite, companyLocation, companySize, industry } = req.body;

    const updateData = {};

    // Common fields
    if (fullName !== undefined) updateData.fullName = fullName;

    // Job Seeker fields
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (education !== undefined) updateData.education = education;
    if (resume !== undefined) updateData.resume = resume;

    // Employer fields
    if (companyName !== undefined) updateData.companyName = companyName;
    if (companyDescription !== undefined) updateData.companyDescription = companyDescription;
    if (companyWebsite !== undefined) updateData.companyWebsite = companyWebsite;
    if (companyLocation !== undefined) updateData.companyLocation = companyLocation;
    if (companySize !== undefined) updateData.companySize = companySize;
    if (industry !== undefined) updateData.industry = industry;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumePath = req.file.filename;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resume: resumePath },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Resume uploaded successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  upload
};
