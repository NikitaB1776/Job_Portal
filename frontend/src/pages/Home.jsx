import { useState } from "react";
import "../styles/home.css";

const Home = () => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    location: ""
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchData);
    // Add your search logic here
  };

  const popularSearches = ["Software Engineer", "Data Analyst", "Product Manager", "UX Designer"];
  

  return (
    <div className="home">
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          🚀 Over 10,000+ Jobs Available
        </div>
        
        <h1 className="hero-title">
          Find Your <span className="gradient-text">Dream Job</span>
        </h1>
        
        <p className="hero-subtitle">
          Discover opportunities from top companies and start your career journey today
        </p>

        {/* Search Box */}
        <form className="search-box" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="search-input"
              value={searchData.keyword}
              onChange={(e) => setSearchData({...searchData, keyword: e.target.value})}
            />
          </div>
          
          <div className="search-input-wrapper">
            <span className="search-icon">📍</span>
            <input 
              type="text" 
              placeholder="City, state, or remote" 
              className="search-input"
              value={searchData.location}
              onChange={(e) => setSearchData({...searchData, location: e.target.value})}
            />
          </div>
          
          <button type="submit" className="search-button">
            Search Jobs
          </button>
        </form>

        {/* Popular Searches */}
        <div className="popular-searches">
          <span className="popular-label">Popular:</span>
          {popularSearches.map((search, index) => (
            <button 
              key={index} 
              className="popular-tag"
              onClick={() => setSearchData({...searchData, keyword: search})}
            >
              {search}
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Active Jobs</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Happy Users</div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Home;