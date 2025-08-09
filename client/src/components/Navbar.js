// components/Navbar.js
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../api/auth';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = isAuthenticated();                
  const isLoggedIn = !!auth?.user || !!auth?.token;

  const handleLogout = async () => {
    try {
      await signout?.();                          
    } catch (_) {}
    localStorage.removeItem('jwt');
    navigate('/signin');
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="logo">JW</div>

      <ul className="nav-links">
        {/* Public */}
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About Me</NavLink></li>

        {/* Private-only */}
        {isLoggedIn && (
          <>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contacts">Contact</NavLink></li>
            <li><NavLink to="/qualifications">Qualifications</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          </>
        )}

        {/* Auth controls */}
        {!isLoggedIn ? (
          <>
            <li><NavLink to="/signin">Login</NavLink></li>
            <li><NavLink to="/signup">Register</NavLink></li>
          </>
        ) : (
          <li>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
