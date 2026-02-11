import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { useUser } from '../../../context/UserContext';

const BrowseJobs = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await api.get('/applications/my');
      setAppliedJobs(response.data);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleApply = async (job) => {
    try {
      const resumesResponse = await api.get('/resumes/my');
      const resumes = resumesResponse.data;

      if (resumes.length === 0) {
        alert('Please upload a resume first.');
        return;
      }

      // Show resume selection modal
      const selectedResumeId = await showResumeSelectionModal(resumes);
      if (!selectedResumeId) return;

      await api.post('/applications/apply', { jobId: job._id, resumeId: selectedResumeId });
      alert('Application submitted successfully!');
      fetchAppliedJobs(); // Refresh applied jobs
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply. Please try again.');
    }
  };

  const showResumeSelectionModal = (resumes) => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content apply-modal">
          <div class="modal-header">
            <h3>Select Resume</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Choose a resume to apply with:</p>
            <div class="resume-list">
              ${resumes.map(resume => `
                <div class="resume-option" data-id="${resume._id}">
                  <div class="resume-info">
                    <h4>${resume.fileName}</h4>
                    <small>Uploaded: ${new Date(resume.uploadedAt).toLocaleDateString()}</small>
                  </div>
                  <button class="btn btn-primary select-resume-btn" data-id="${resume._id}">Select</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeModal = () => {
        document.body.removeChild(modal);
        resolve(null);
      };

      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      modal.querySelectorAll('.select-resume-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const resumeId = btn.getAttribute('data-id');
          document.body.removeChild(modal);
          resolve(resumeId);
        });
      });
    });
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || job.jobType === filterType;
    const matchesLocation = !filterLocation ||
                           job.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  const isJobApplied = (jobId) => {
    return appliedJobs.some(app => app.job._id === jobId);
  };

  return (
    <div className="browse-jobs">
      <h1 className="page-title">Browse Jobs</h1>

      {/* Search and Filters */}
      <div className="search-section">
        <div className="search-bar">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select 
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Job Listings */}
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div key={job._id} className="job-card">
            <div className="job-card-header">
              <div className="job-logo-section">
                <div className="job-logo">{job.logo}</div>
                <div className="job-basic-info">
                  <h3 className="job-card-title">{job.title}</h3>
                  <p className="job-card-company">{job.company}</p>
                </div>
              </div>
              {job.featured && <span className="badge badge-featured-sm">Featured</span>}
            </div>

            <div className="job-card-details">
              <div className="job-detail-item">
                <span className="detail-icon">📍</span>
                <span className="detail-text">{job.location}</span>
              </div>
              <div className="job-detail-item">
                <span className="detail-icon">💼</span>
                <span className="detail-text">{job.jobType}</span>
              </div>
              <div className="job-detail-item">
                <span className="detail-icon">💰</span>
                <span className="detail-text">{job.salary}</span>
              </div>
            </div>

            <p className="job-card-description">{job.description}</p>

            <div className="job-card-footer">
              <span className="job-posted-date">
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </span>
              <button
                className={`btn ${isJobApplied(job._id) ? 'btn-applied' : 'btn-primary'}`}
                onClick={() => handleApply(job)}
                disabled={isJobApplied(job._id)}
              >
                {isJobApplied(job._id) ? '✓ Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;