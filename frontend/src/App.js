import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboards
import JobSeekerDashboard from "./pages/dashboard/jobseekerdashboard/JobSeekerDashboard";
import EmployerDashboard from "./pages/dashboard/employerdashboard/EmployerDashboard";

// Employer subpages
import DashboardOverview from "./pages/dashboard/employerdashboard/DashboardOverview";
import PostJobs from "./pages/dashboard/employerdashboard/PostJobs";
import Applicants from "./pages/dashboard/employerdashboard/Applicants";
import ResumeViewer from "./pages/dashboard/employerdashboard/ResumeViewer";
import MyJobs from "./pages/dashboard/employerdashboard/MyJobs";

// Protected route wrapper
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div style={{ position: "relative" }}>
      {/* Navbar fixed on top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar />
      </div>

      {/* Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employer dashboard routes */}
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute requiredRole="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard/overview"
          element={
            <ProtectedRoute requiredRole="employer">
              <DashboardOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard/post-jobs"
          element={
            <ProtectedRoute requiredRole="employer">
              <PostJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard/applicants/:jobId?"
          element={
            <ProtectedRoute requiredRole="employer">
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard/applicants/:jobId"
          element={
            <ProtectedRoute requiredRole="employer">
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard/resume-viewer"
          element={
            <ProtectedRoute requiredRole="employer">
              <ResumeViewer />
            </ProtectedRoute>
          }
        />


        {/* Job seeker routes */}
        <Route
          path="/jobseeker-dashboard"
          element={
            <ProtectedRoute requiredRole="jobseeker">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;
