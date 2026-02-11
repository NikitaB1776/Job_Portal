import React from 'react';

/**
 * Sidebar - Shared by both Employer and Job Seeker dashboards
 * Receives different menuItems based on user role
 */
const Sidebar = ({ activeTab, setActiveTab, menuItems }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;