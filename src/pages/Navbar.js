import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import icon1 from './images/icon1.png';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('authToken'); // or use a more secure method
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // or use a more secure method
    setIsAuthenticated(false);
  };

  return (
    <div className='navbarr'>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <NavLink className="NavLink" to="/" ><img src={icon1} alt="logo" /></NavLink>
        </li>
      </ul>
      <ul style={{ listStyleType: 'none', marginTop: '1px', fontSize: '28px' }}>
        <li>
          <NavLink to="/" activeclassname="Activee" className="NavLink">Home</NavLink>
        </li>
      </ul>
      <ul style={{ listStyleType: 'none', marginTop: '3px' }}>
        {isAuthenticated ? (
          <li>
            <button className='button' onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <NavLink to="/login">
              <button className='button'>Login/Register</button>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
