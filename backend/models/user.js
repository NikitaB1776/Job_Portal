const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["jobseeker", "employer"],
    required: true,
  },
  // Job Seeker Profile Fields
  phone: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  skills: [{
    type: String,
  }],
  experience: [{
    position: String,
    company: String,
    duration: String,
    description: String,
  }],
  education: [{
    degree: String,
    institution: String,
    year: String,
  }],
  resume: {
    type: String, // URL or filename
    default: "",
  },
  // Employer Profile Fields
  companyName: {
    type: String,
    default: "",
  },
  companyDescription: {
    type: String,
    default: "",
  },
  companyWebsite: {
    type: String,
    default: "",
  },
  companyLocation: {
    type: String,
    default: "",
  },
  companySize: {
    type: String,
    default: "",
  },
  industry: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
