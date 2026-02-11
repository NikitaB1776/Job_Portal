import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user?.role === "employer" ? "/employer-dashboard" : "/jobseeker-dashboard";
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
