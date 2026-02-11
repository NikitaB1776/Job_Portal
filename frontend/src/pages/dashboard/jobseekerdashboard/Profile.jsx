import React, { useState, useEffect } from 'react';
import { MOCK_USER_PROFILE } from '../../../data/jobSeekerData';
import { useUser } from '../../../context/UserContext';
import api from '../../../api/axios';
/**

Profile Component - Job Seeker Profile Page
Displays and allows editing of user profile information
*/
const Profile = () => {
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    resume: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

useEffect(() => {
  if (user) {
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      skills: user.skills || [],
      experience: user.experience || [],
      education: user.education || [],
      resume: user.resume || '',
    });
  }
}, [user]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSave = async () => {
  setLoading(true);
  const result = await updateUserProfile(formData);
  setLoading(false);

  if (result.success) {
    setIsEditing(false);
    alert('Profile updated successfully!');
  } else {
    alert(result.message);
  }
};

const handleCancel = () => {
  if (user) {
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      skills: user.skills || [],
      experience: user.experience || [],
      education: user.education || [],
      resume: user.resume || '',
    });
  }
  setIsEditing(false);
};

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleUploadResume = async () => {
  if (!selectedFile) {
    alert('Please select a file to upload.');
    return;
  }

  const formDataUpload = new FormData();
  formDataUpload.append('resume', selectedFile);

  try {
    const response = await api.post('/profile/upload-resume', formDataUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      alert('Resume uploaded successfully!');
      // Update the user context or reload the profile
      window.location.reload();
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert('Error uploading resume.');
  }
};
return (
<div className="profile">
{/* Page Header */}
<div className="page-header">
<h1 className="page-title">My Profile</h1>
{!isEditing ? (
<button className="btn btn-primary" onClick={() => setIsEditing(true)}>
✏️ Edit Profile
</button>
) : (
<div className="edit-actions">
<button className="btn btn-secondary" onClick={handleCancel}>
Cancel
</button>
<button className="btn btn-success" onClick={handleSave}>
💾 Save Changes
</button>
</div>
)}
</div>
  <div className="profile-content">
    {/* Personal Information Section */}
    <div className="profile-section">
      <h2 className="profile-section-title">Personal Information</h2>
      <div className="profile-card">
        <div className="profile-header-section">
          <div className="profile-avatar-large">
            {(user?.fullName || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-info">
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Full Name"
              />
            ) : (
              <h2 className="profile-name">{user?.fullName || 'User'}</h2>
            )}
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <label className="profile-label">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <p className="profile-value">📧 {user?.email || 'Not provided'}</p>
            )}
          </div>

          <div className="profile-detail-item">
            <label className="profile-label">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <p className="profile-value">📱 {user?.phone || 'Not provided'}</p>
            )}
          </div>

          <div className="profile-detail-item">
            <label className="profile-label">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <p className="profile-value">📍 {user?.location || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="profile-bio-section">
          <label className="profile-label">Bio</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="profile-bio">{user?.bio || 'Not provided'}</p>
          )}
        </div>
      </div>
    </div>

    {/* Skills Section */}
    <div className="profile-section">
      <h2 className="profile-section-title">Skills</h2>
      <div className="profile-card">
        <div className="skills-container">
          {(user?.skills || []).map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
          {isEditing && (
            <button className="skill-tag skill-tag-add">
              + Add Skill
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Experience Section */}
    <div className="profile-section">
      <h2 className="profile-section-title">Work Experience</h2>
      <div className="profile-card">
        {(user?.experience || []).map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <h3 className="experience-position">{exp.position}</h3>
                <p className="experience-company">{exp.company}</p>
              </div>
              <span className="experience-duration">{exp.duration}</span>
            </div>
            <p className="experience-description">{exp.description}</p>
          </div>
        ))}
        {isEditing && (
          <button className="btn btn-secondary btn-add">
            + Add Experience
          </button>
        )}
      </div>
    </div>

    {/* Education Section */}
    <div className="profile-section">
      <h2 className="profile-section-title">Education</h2>
      <div className="profile-card">
        {(user?.education || []).map((edu, index) => (
          <div key={index} className="education-item">
            <div className="education-header">
              <div>
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
              </div>
              <span className="education-year">{edu.year}</span>
            </div>
          </div>
        ))}
        {isEditing && (
          <button className="btn btn-secondary btn-add">
            + Add Education
          </button>
        )}
      </div>
    </div>

    {/* Resume Section */}
    <div className="profile-section">
      <h2 className="profile-section-title">Resume</h2>
      <div className="profile-card">
        <div className="resume-section">
          <div className="resume-info">
            <div className="resume-icon">📄</div>
            <div>
              <p className="resume-filename">{user?.resume || 'Not uploaded'}</p>
              <p className="resume-meta">Uploaded on Jan 15, 2024</p>
            </div>
          </div>
          <div className="resume-actions">
            <button
              className="btn btn-secondary"
              onClick={() => window.open(`http://localhost:5000/uploads/${user?.resume}`, '_blank')}
              disabled={!user?.resume}
            >
              👁️ View
            </button>
            {isEditing && (
              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="form-input"
                />
                <button className="btn btn-primary" onClick={handleUploadResume}>
                  📤 Upload Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};
export default Profile;