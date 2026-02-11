import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();


  // Validation functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      let error = "";
      if (name === "email") error = validateEmail(value);
      else if (name === "password") error = validatePassword(value);
      
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "email") error = validateEmail(value);
    else if (name === "password") error = validatePassword(value);
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  setErrors({
    email: emailError,
    password: passwordError
  });

  setTouched({
    email: true,
    password: true
  });

  if (emailError || passwordError) return;

  try {
    const res = await api.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    // Fetch full user profile after login
    const profileRes = await api.get("/profile");
    login(profileRes.data);

    alert("Login successful");

    // Navigate based on role
    if (res.data.user.role === "employer") {
      navigate("/employer-dashboard");
    } else {
      navigate("/jobseeker-dashboard");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <form onSubmit={handleSubmit}>
        <div className="auth-card">
          {/* Badge */}
          <div style={{ textAlign: 'center' }}>
            <span className="auth-badge">🔐 Secure Login</span>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Login to access your account and find your next opportunity</p>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email Address" 
                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password" 
                className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
              />
            </div>
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Forgot Password Link */}
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>

          {/* Submit Button */}
          <button type="submit" className="auth-button">
            Login
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons">
            <button type="button" className="social-button">
              <span>🔍</span> Google
            </button>
            <button type="button" className="social-button">
              <span>💼</span> LinkedIn
            </button>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;