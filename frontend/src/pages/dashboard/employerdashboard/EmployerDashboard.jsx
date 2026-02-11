import React, { useState } from 'react';
import DashboardNavbar from '../../../components/DashboardNavbar'; // ← Changed
import Sidebar from '../../../components/Sidebar';
import DashboardOverview from './DashboardOverview';
import PostJob from './PostJobs';
import MyJobs from './MyJobs';
import Applicants from './Applicants';
import EmployerProfile from './EmployerProfile';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const employerName = user?.fullName || user?.companyName || 'Employer';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'post-job', label: 'Post Job', icon: '➕' },
    { id: 'my-jobs', label: 'My Jobs', icon: '💼' },
    { id: 'applicants', label: 'Applicants', icon: '👥' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      alert('Logged out successfully!');
      window.location.href = '/';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'post-job':
        return <PostJob />;
      case 'my-jobs':
        return <MyJobs />;
      case 'applicants':
        return <Applicants />;
      case 'profile':
        return <EmployerProfile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardNavbar userName={employerName} onLogout={handleLogout} />
      
      <div className="dashboard-layout">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          menuItems={menuItems}
        />
        
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;