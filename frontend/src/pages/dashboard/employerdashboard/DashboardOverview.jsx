import React from 'react';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '../../../data/DummyData';

/**
 * Dashboard Overview Component
 * Displays statistics and recent jobs
 */
const DashboardOverview = () => {
  // Calculate statistics
  const totalJobs = DUMMY_JOBS.length;
  const activeJobs = DUMMY_JOBS.filter(job => job.status === 'Active').length;
  const totalApplicants = DUMMY_JOBS.reduce((sum, job) => sum + job.applicants, 0);

  const stats = [
    { label: 'Total Jobs Posted', value: totalJobs, color: '#4F46E5', icon: '💼' },
    { label: 'Active Jobs', value: activeJobs, color: '#10B981', icon: '✅' },
    { label: 'Total Applicants', value: totalApplicants, color: '#F59E0B', icon: '👥' },
    { label: 'Hired This Month', value: 5, color: '#8B5CF6', icon: '🎉' }
  ];

  return (
    <div className="dashboard-overview">
      <h1 className="page-title">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs Table */}
      <div className="recent-section">
        <h2 className="section-title">Recent Jobs</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_JOBS.slice(0, 3).map((job) => (
                <tr key={job.id}>
                  <td className="font-semibold">{job.title}</td>
                  <td>{job.location}</td>
                  <td>{new Date(job.posted).toLocaleDateString()}</td>
                  <td>
                    <span className="badge badge-info">{job.applicants} applicants</span>
                  </td>
                  <td>
                    <span className={`badge ${job.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;