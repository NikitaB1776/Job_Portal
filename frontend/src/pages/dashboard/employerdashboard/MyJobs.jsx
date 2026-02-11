import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { useNavigate } from "react-router-dom";



/**
 * My Jobs Component
 * Displays list of jobs posted by the employer with actions
 */
const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs/employer');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on status
  const filteredJobs = filter === 'all'
    ? jobs
    : jobs.filter(job => (job.isActive ? 'active' : 'closed') === filter);

  // Delete job
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  // Toggle job status (Active/Closed)
  const handleToggleStatus = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'Active' ? 'Closed' : 'Active' }
        : job
    ));
  };

  return (
    <div className="my-jobs">
      {/* Page Header with Filters */}
      <div className="page-header">
        <h1 className="page-title">My Jobs</h1>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({jobs.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({jobs.filter(j => j.isActive).length})
          </button>
          <button
            className={`filter-btn ${filter === 'closed' ? 'active' : ''}`}
            onClick={() => setFilter('closed')}
          >
            Closed ({jobs.filter(j => !j.isActive).length})
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            {/* Job Card Header */}
            <div className="job-card-header">
              <div>
                <h3 className="job-title">{job.title}</h3>
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                  <span>📅 Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`badge ${job.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                {job.status}
              </span>
            </div>

            {/* Job Description */}
            <p className="job-description">{job.description}</p>

            {/* Job Card Footer with Actions */}
            <div className="job-card-footer">
              <div className="applicants-count">
                👥 {job.applicants} Applicants
              </div>
              <div className="job-actions">
                <button
                className="btn btn-secondary btn-small"
                onClick={() => navigate(`/employer-dashboard/applicants/${job._id}`)}
                disabled={job.applicants === 0}
>
  👁️ View Applicants
</button>

                <button className="btn-icon" title="Edit">
                  ✏️
                </button>
                <button
                  className="btn-icon"
                  title={job.isActive ? 'Close Job' : 'Reopen Job'}
                  onClick={() => handleToggleStatus(job.id)}
                >
                  {job.isActive ? '⏸️' : '▶️'}
                </button>
                <button
                  className="btn-icon btn-delete"
                  title="Delete"
                  onClick={() => handleDelete(job.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No jobs found</h3>
          <p>No jobs match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default MyJobs;