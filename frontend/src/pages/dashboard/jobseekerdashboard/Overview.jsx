import React from 'react';
import { MOCK_JOBS } from '../../../data/jobSeekerData';

const Overview = ({ appliedJobs }) => {
  const stats = [
    { 
      label: 'Jobs Applied', 
      value: appliedJobs.length, 
      color: '#4F46E5', 
      icon: '📝',
      description: 'Total applications'
    },
    { 
      label: 'Under Review', 
      value: appliedJobs.filter(job => job.status === 'Under Review').length, 
      color: '#F59E0B', 
      icon: '👀',
      description: 'Being reviewed'
    },
    { 
      label: 'Interviews', 
      value: appliedJobs.filter(job => job.status === 'Interview Scheduled').length, 
      color: '#10B981', 
      icon: '🎯',
      description: 'Scheduled'
    },
    { 
      label: 'New Jobs', 
      value: MOCK_JOBS.length, 
      color: '#8B5CF6', 
      icon: '✨',
      description: 'Available today'
    }
  ];

  const featuredJobs = MOCK_JOBS.filter(job => job.featured).slice(0, 3);
  const recentApplications = appliedJobs.slice(0, 3);

  return (
    <div className="overview">
      <h1 className="page-title">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        {/* Featured Jobs */}
        <div className="overview-section">
          <h2 className="section-title">🌟 Featured Jobs</h2>
          <div className="job-recommendations">
            {featuredJobs.map(job => (
              <div key={job.id} className="job-recommendation-card">
                <div className="job-rec-header">
                  <div className="job-rec-logo">{job.logo}</div>
                  <div className="job-rec-info">
                    <h3 className="job-rec-title">{job.title}</h3>
                    <p className="job-rec-company">{job.company}</p>
                  </div>
                </div>
                <div className="job-rec-details">
                  <span className="job-rec-detail">📍 {job.location}</span>
                  <span className="job-rec-detail">💰 {job.salary}</span>
                </div>
                <span className="badge badge-featured">Featured</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="overview-section">
          <h2 className="section-title">📋 Recent Applications</h2>
          <div className="recent-applications">
            {recentApplications.length === 0 ? (
              <div className="empty-state-small">
                <p>No applications yet</p>
                <p className="empty-hint">Start browsing jobs to apply!</p>
              </div>
            ) : (
              recentApplications.map(app => (
                <div key={app.id} className="application-item">
                  <div className="app-item-header">
                    <div className="app-item-logo">{app.logo}</div>
                    <div className="app-item-info">
                      <h4 className="app-item-title">{app.title}</h4>
                      <p className="app-item-company">{app.company}</p>
                    </div>
                  </div>
                  <div className="app-item-footer">
                    <span className="app-item-date">
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                    <span className={`badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  const statusMap = {
    'Under Review': 'badge-warning',
    'Interview Scheduled': 'badge-success',
    'Rejected': 'badge-danger',
    'Accepted': 'badge-success'
  };
  return statusMap[status] || 'badge-secondary';
};

export default Overview;