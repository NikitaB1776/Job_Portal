import React, { useState } from 'react';
import api from '../../../api/axios';

/**
 * Post Job Component
 * Form for creating new job postings
 */
const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    skills: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.title || !formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.description || !formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location || !formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary || !formData.salary.trim()) newErrors.salary = 'Salary range is required';
    if (!formData.experienceLevel || !formData.experienceLevel.trim()) newErrors.experienceLevel = 'Experience level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const jobData = {
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        };
        await api.post('/jobs', jobData);
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          description: '',
          location: '',
          salary: '',
          jobType: 'Full-time',
          experienceLevel: 'Fresher',
          skills: '',
          requirements: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        console.error('Error posting job:', error);
        const errorMessage = error.response?.data?.message || 'Failed to post job. Please try again.';
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="post-job">
      <h1 className="page-title">Post a New Job</h1>
      
      {/* Success Alert */}
      {success && (
        <div className="alert alert-success">
          ✓ Job posted successfully!
        </div>
      )}

      {/* Job Posting Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Row 1: Title and Type */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Senior Frontend Developer"
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Job Type *</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              rows="5"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Row 2: Location and Salary */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${errors.location ? 'error' : ''}`}
                placeholder="e.g. San Francisco, CA or Remote"
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Salary Range *</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={`form-input ${errors.salary ? 'error' : ''}`}
                placeholder="e.g. $80,000 - $120,000"
              />
              {errors.salary && <span className="error-text">{errors.salary}</span>}
            </div>
          </div>

          {/* Experience Level */}
          <div className="form-group">
            <label className="form-label">Experience Level *</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className={`form-input ${errors.experienceLevel ? 'error' : ''}`}
            >
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
            {errors.experienceLevel && <span className="error-text">{errors.experienceLevel}</span>}
          </div>

          {/* Skills */}
          <div className="form-group">
            <label className="form-label">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. JavaScript, React, Node.js (comma separated)"
            />
          </div>

          {/* Requirements */}
          <div className="form-group">
            <label className="form-label">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="List key skills, qualifications, and experience required..."
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;