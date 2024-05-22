import React from 'react'
import './Navbar.css';
import logo_icon from '../Assets/logo.png';
import profile_icon from '../Assets/profile_icon.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src={logo_icon} alt="logo" />
      </div>
      <div className="user">
        <img src={profile_icon} alt="user" />
      </div>
    </div>
  )
}

export default Navbar
