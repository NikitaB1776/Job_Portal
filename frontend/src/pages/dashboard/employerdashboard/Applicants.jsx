import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  /* ---------------- FETCH JOBS ---------------- */
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/employer");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  /* ---------------- FETCH APPLICANTS ---------------- */
  useEffect(() => {
    if (jobId) {
      fetchApplicants(jobId);
    }
  }, [jobId]);

  const fetchApplicants = async (jobId) => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/job/${jobId}`);
      console.log("Applicants:", res.data);
      setApplicants(res.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STATUS UPDATE ---------------- */
  const handleStatusChange = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      fetchApplicants(jobId);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Shortlisted") return "badge-success";
    if (status === "Rejected") return "badge-danger";
    return "badge-info";
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailsModal(true);
  };

  const handleViewResume = (resumeUrl) => {
    if (resumeUrl) {
      navigate('/employer-dashboard/resume-viewer', { state: { resumeUrl } });
    } else {
      alert('Resume not available');
    }
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setSelectedApplicant(null);
  };

  if (loading) return <p>Loading applicants...</p>;

  return (
    <div className="applicants">
      <Navbar background='transparent' />
      <h1 className="page-title">Applicants</h1>

      {/* JOB SELECTOR */}
      <select
        className="form-input"
        value={jobId}
        onChange={(e) =>
          navigate(`/employer-dashboard/applicants/${e.target.value}`)
        }
      >
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      {/* TABLE */}
      {applicants.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Applied On</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id}>
                <td>{app.applicant?.fullName}</td>
                <td>{app.applicant?.email}</td>
                <td>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button
                    onClick={() => {
                      const resumeUrl = typeof app.resume === 'string' ? `http://localhost:5000${app.resume}` : app.resume?.filePath ? `http://localhost:5000${app.resume.filePath}` : null;
                      handleViewResume(resumeUrl);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                  >
                    📄 View Resume
                  </button>
                </td>
                <td>
                  <span className={`badge ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option>Under Review</option>
                    <option>Shortlisted</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedApplicant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Applicant Details</h2>
              <button onClick={closeModals} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <strong>Name:</strong> {selectedApplicant.applicant?.fullName}
              </div>
              <div>
                <strong>Email:</strong> {selectedApplicant.applicant?.email}
              </div>
              <div>
                <strong>Applied On:</strong> {new Date(selectedApplicant.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Status:</strong> {selectedApplicant.status}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Applicants;
