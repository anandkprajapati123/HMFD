import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

function Navbar() {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Admin Logo" />

      <div className="navbar-right">
        <div className="navbar-user-info">
          <span className="navbar-user-name">Admin</span>
          <span className="navbar-user-role">Super Admin</span>
        </div>
        <img className='profile' src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar