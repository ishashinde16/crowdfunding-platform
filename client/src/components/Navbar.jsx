import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('cat'); // example: 'medical', 'arts' etc.

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt="CrowdX" />
        </div>
        <div className='links'>
          {['medical', 'business', 'arts', 'education', 'social'].map((cat) => (
            <Link className={`link ${activeCategory === cat ? 'active' : ''}`} key={cat} to={`/?cat=${cat}`}>
              <h6>{cat.toUpperCase()}</h6>
            </Link>
          ))}

          <span>John</span>
          <span>Logout</span>
          <span className='campaign'>
            <Link className="link" to="/campaign">Launch</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
