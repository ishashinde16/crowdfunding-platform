import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../images/logo.png"
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <img src={Logo } alt="CrowdX" />
        </div>
        <div className='links'>
          <Link className='link' to="/?cat=medical">
            <h6>MEDICAL</h6>
            </Link>
            <Link className='link' to="/?cat=business">
            <h6>BUSINESS</h6>
            </Link>
            <Link className='link' to="/?cat=arts">
            <h6>ARTS</h6>
            </Link>
            <Link className='link' to="/?cat=education">
            <h6>EDUCATION</h6>
            </Link>
            <Link className='link' to="/?cat=social">
            <h6>SOCIAL</h6>
            </Link>
            <span>John</span>
            <span>Logout</span>
            <span className='campaign'>
              <Link className="link" to="/campaign">Launch</Link>
            </span>
        
        </div>
      </div>
    
    </div>
  )
}

export default Navbar