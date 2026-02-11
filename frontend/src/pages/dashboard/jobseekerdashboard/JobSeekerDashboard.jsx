import React, { useState } from 'react';
import DashboardNavbar from '../../../components/DashboardNavbar'; // ← Using DashboardNavbar
import Sidebar from '../../../components/Sidebar';
import Overview from './Overview';
import BrowseJobs from './BrowseJobs';
import AppliedJobs from './AppliedJobs';
import Resumes from './Resumes';
import Profile from './Profile';
import { MOCK_APPLIED_JOBS } from '../../../data/jobSeekerData';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [appliedJobs, setAppliedJobs] = useState(MOCK_APPLIED_JOBS);
  const userName = user?.fullName || 'John Doe';

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'browse-jobs', label: 'Browse Jobs', icon: '🔍' },
    { id: 'applied-jobs', label: 'Applied Jobs', icon: '📝' },
    { id: 'resumes', label: 'My Resumes', icon: '📄' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      alert('Logged out successfully!');
      window.location.href = '/';
    }
  };

  const handleApplyJob = (job) => {
    const alreadyApplied = appliedJobs.some(aj => aj.jobId === job.id);
    
    if (alreadyApplied) {
      alert('You have already applied to this job!');
      return;
    }

    const newApplication = {
      id: appliedJobs.length + 1,
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      logo: job.logo
    };

    setAppliedJobs([newApplication, ...appliedJobs]);
    alert('Application submitted successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview appliedJobs={appliedJobs} />;
      case 'browse-jobs':
        return <BrowseJobs onApply={handleApplyJob} appliedJobs={appliedJobs} />;
      case 'applied-jobs':
        return <AppliedJobs appliedJobs={appliedJobs} />;
      case 'resumes':
        return <Resumes />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview appliedJobs={appliedJobs} />;
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardNavbar userName={userName} onLogout={handleLogout} />
      
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

export default JobSeekerDashboard;