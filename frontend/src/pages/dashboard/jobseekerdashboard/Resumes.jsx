import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import './resume.css';

const Resumes = () => {
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes/my');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    try {
      await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Resume uploaded successfully!');
      fetchResumes();
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  const handleViewResume = (resume) => {
    window.open(`http://localhost:5000${resume.filePath}`, '_blank');
  };

  const handleDownloadResume = (resume) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000${resume.filePath}`;
    link.download = resume.fileName;
    link.click();
  };

  if (loading) {
    return <div className="loading">Loading resumes...</div>;
  }

  return (
    <div className="resumes-container">
      <h1 className="page-title">My Resumes</h1>

      {/* Upload Section */}
      <div className="upload-section">
        <h2>Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {uploading && <p className="uploading-text">Uploading...</p>}
        <p className="upload-note">
          Supported formats: PDF, DOC, DOCX (Max 5MB)
        </p>
      </div>

      {/* Resume List */}
      <div className="resumes-list">
        <h2>Uploaded Resumes</h2>

        {resumes.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📄</span>
            <p>No resumes uploaded yet</p>
          </div>
        ) : (
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card">
                <div className="resume-info">
                  <h3>{resume.fileName}</h3>
                  <p>
                    Uploaded on{' '}
                    {new Date(resume.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="resume-actions">
                  <button
                    className="btn secondary"
                    onClick={() => handleViewResume(resume)}
                  >
                    View
                  </button>
                  <button
                    className="btn primary"
                    onClick={() => handleDownloadResume(resume)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumes;
