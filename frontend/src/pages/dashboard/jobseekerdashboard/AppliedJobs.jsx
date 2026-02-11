import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  // Refresh applications every 30 seconds to get status updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchApplications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/my');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filterStatus === 'all'
    ? applications
    : applications.filter(app => app.status === filterStatus);

  const getStatusClass = (status) => {
    const statusMap = {
      'Applied': 'badge-warning',
      'Shortlisted': 'badge-success',
      'Rejected': 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'Applied': '📝',
      'Shortlisted': '✅',
      'Rejected': '❌'
    };
    return iconMap[status] || '📝';
  };

  return (
    <div className="applied-jobs">
      <div className="page-header">
        <h1 className="page-title">Applied Jobs</h1>
        
        <div className="status-filters">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({applications.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'Applied' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Applied')}
          >
            Applied ({applications.filter(app => app.status === 'Applied').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'Shortlisted' ? 'active' : ''}`}
            onClick={() => setFilterStatus('Shortlisted')}
          >
            Shortlisted ({applications.filter(app => app.status === 'Shortlisted').length})
          </button>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No applications found</h3>
          <p>Start browsing jobs and apply to get started!</p>
        </div>
      ) : (
        <div className="applied-jobs-list">
          {filteredApplications.map(app => (
            <div key={app._id} className="applied-job-card">
              <div className="applied-job-header">
                <div className="applied-job-main">
                  <div className="applied-job-logo">{app.job.companyName.charAt(0)}</div>
                  <div className="applied-job-info">
                    <h3 className="applied-job-title">{app.job.title}</h3>
                    <p className="applied-job-company">{app.job.companyName}</p>
                    <p className="applied-job-location">📍 {app.job.location}</p>
                  </div>
                </div>
                <div className="applied-job-status">
                  <span className={`badge ${getStatusClass(app.status)}`}>
                    {getStatusIcon(app.status)} {app.status}
                  </span>
                </div>
              </div>

              <div className="applied-job-footer">
                <div className="application-info">
                  <span className="application-date">
                    Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                  <span className="application-id">
                    Application ID: #{app._id}
                  </span>
                </div>
                <div className="application-actions">
                  <button className="btn-text">View Details</button>
                  <button className="btn-text">Withdraw</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;