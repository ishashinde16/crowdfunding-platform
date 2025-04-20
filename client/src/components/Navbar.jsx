import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../App"; 
import Logo from "../images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const { email, setEmail } = useContext(UserContext);

  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('cat');

  const handleLogout = () => {
    setEmail("");
    localStorage.removeItem("email");
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt="CrowdX" style={{ cursor: "pointer" }} />
          </Link>
        </div>
        <div className='links'>
          {/* ✨ Added "miscellaneous" to the category list */}
          {['healthcare', 'business', 'arts', 'education', 'social', 'miscellaneous'].map((cat) => (
            <Link className={`link ${activeCategory === cat ? 'active' : ''}`} key={cat} to={`/?cat=${cat}`}>
              <h6>{cat.toUpperCase()}</h6>
            </Link>
          ))}

          {email ? (
            <>
              <span>{email.split('@')[0]}</span>
              <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
            </>
          ) : (
            <>
              <Link className="link" to="/login">Login</Link>
              <Link className="link" to="/register">Register</Link>
            </>
          )}

          <span className='campaign'>
            <Link className="link" to="/campaign">Launch</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
