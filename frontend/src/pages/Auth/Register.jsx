import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";

const Register = () => {
  const [userType, setUserType] = useState("jobseeker");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain a lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain an uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain a number";
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      let error = "";
      if (name === "fullName") error = validateFullName(value);
      else if (name === "email") error = validateEmail(value);
      else if (name === "password") error = validatePassword(value);
      
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "fullName") error = validateFullName(value);
    else if (name === "email") error = validateEmail(value);
    else if (name === "password") error = validatePassword(value);
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      fullName: nameError,
      email: emailError,
      password: passwordError
    });

    setTouched({
      fullName: true,
      email: true,
      password: true
    });

    if (!nameError && !emailError && !passwordError) {
      console.log("Form submitted:", { ...formData, userType });
      alert(`Registration successful as ${userType}!`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <form onSubmit={handleSubmit}>
        <div className="auth-card">
          {/* Badge */}
          <div style={{ textAlign: 'center' }}>
            <span className="auth-badge">🚀 Join Now</span>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join us and start your career journey today</p>
          </div>

          {/* Full Name Input */}
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full Name" 
                className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
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

          {/* User Type Selection */}
          <div className="user-type-container">
            <label className="user-type-label">I am a:</label>
            
            <div className="user-type-options">
              {/* Job Seeker Option */}
              <div 
                onClick={() => setUserType("jobseeker")}
                className={`user-type-card ${userType === "jobseeker" ? "active" : ""}`}
              >
                <div className="user-type-icon">🔍</div>
                <div className="user-type-title">Job Seeker</div>
                <div className="user-type-description">Looking for jobs</div>
              </div>

              {/* Employer Option */}
              <div 
                onClick={() => setUserType("employer")}
                className={`user-type-card ${userType === "employer" ? "active" : ""}`}
              >
                <div className="user-type-icon">💼</div>
                <div className="user-type-title">Employer</div>
                <div className="user-type-description">Hiring talent</div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-button">
            Create Account
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
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;