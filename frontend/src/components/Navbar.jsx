import { Link } from "react-router-dom";

function Navbar({ background = 'transparent' }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: background,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      {/* LEFT: LOGO */}
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'white'
      }}>
        JobPortal
      </div>

      {/* RIGHT: NAV LINKS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Home
        </Link>
        
        <Link 
          to="/login" 
          style={{
            padding: '0.5rem 1.5rem',
            border: '2px solid white',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            backgroundColor: 'transparent',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#4338ca';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'white';
          }}
        >
          Login
        </Link>
        
        <Link 
          to="/register" 
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '6px',
            backgroundColor: 'white',
            color: '#4338ca',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;