import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

const ResumeViewer = () => {
  const location = useLocation();
  const { resumeUrl } = location.state || {};

  if (!resumeUrl) {
    return <div>Resume not found</div>;
  }

  return (
    <div>
      <Navbar background='transparent' />
      <div style={{ padding: '2rem', marginTop: '60px' }}>
        <h1>Applicant Resume</h1>
        <iframe
          src={resumeUrl}
          style={{
            width: '100%',
            height: '80vh',
            border: 'none',
            borderRadius: '8px'
          }}
          title="Resume"
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
