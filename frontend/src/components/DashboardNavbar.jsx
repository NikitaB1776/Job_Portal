import React from 'react';

/**
 * DashboardNavbar - For authenticated users in dashboards
 * Different from the public Navbar used on landing/login/register pages
 */
const DashboardNavbar = ({ userName, onLogout }) => {
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar-content">
        {/* LEFT: App Branding */}
        <div className="dashboard-navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Job Portal</span>
        </div>

        {/* RIGHT: User Info & Logout */}
        <div className="dashboard-navbar-right">
          <div className="user-info">
            <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
            <span className="user-name">{userName}</span>
          </div>
          <button className="btn btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;