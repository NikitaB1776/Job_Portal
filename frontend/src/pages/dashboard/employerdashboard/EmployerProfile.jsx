import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';

/**
EmployerProfile Component - Employer Profile Page
Displays and allows editing of employer profile information
*/
const EmployerProfile = () => {
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    companyLocation: '',
    companySize: '',
    industry: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        companyName: user.companyName || '',
        companyDescription: user.companyDescription || '',
        companyWebsite: user.companyWebsite || '',
        companyLocation: user.companyLocation || '',
        companySize: user.companySize || '',
        industry: user.industry || '',
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
        companyName: user.companyName || '',
        companyDescription: user.companyDescription || '',
        companyWebsite: user.companyWebsite || '',
        companyLocation: user.companyLocation || '',
        companySize: user.companySize || '',
        industry: user.industry || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="profile">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Company Profile</h1>
        {!isEditing ? (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Changes'}
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
                  <p className="profile-value">📧 {user?.email || ''}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Company Information</h2>
          <div className="profile-card">
            <div className="profile-details-grid">
              <div className="profile-detail-item">
                <label className="profile-label">Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="profile-value">🏢 {user?.companyName || 'Not set'}</p>
                )}
              </div>

              <div className="profile-detail-item">
                <label className="profile-label">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="profile-value">🌐 {user?.companyWebsite || 'Not set'}</p>
                )}
              </div>

              <div className="profile-detail-item">
                <label className="profile-label">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="profile-value">📍 {user?.companyLocation || 'Not set'}</p>
                )}
              </div>

              <div className="profile-detail-item">
                <label className="profile-label">Company Size</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 1-10, 11-50, 51-200"
                  />
                ) : (
                  <p className="profile-value">👥 {user?.companySize || 'Not set'}</p>
                )}
              </div>

              <div className="profile-detail-item">
                <label className="profile-label">Industry</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p className="profile-value">🏭 {user?.industry || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="profile-bio-section">
              <label className="profile-label">Company Description</label>
              {isEditing ? (
                <textarea
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Describe your company..."
                />
              ) : (
                <p className="profile-bio">{user?.companyDescription || 'No description provided.'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
