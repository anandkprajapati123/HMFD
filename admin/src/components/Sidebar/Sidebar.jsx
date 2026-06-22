import React from 'react'
import './Sidebsr.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <span className="sidebar-section-label">Main Menu</span>
      <div className="sidebar-options">
        <NavLink to={'/add'} className="sidebar-option">
          <img className="sidebar-icon" src={assets.add_icon} alt="" />
          <span className="sidebar-option-text">Add Items</span>
        </NavLink>
        <NavLink to={'/list'} className="sidebar-option">
          <img className="sidebar-icon" src={assets.order_icon} alt="" />
          <span className="sidebar-option-text">Food List</span>
        </NavLink>
        <NavLink to={'/order'} className="sidebar-option">
          <img className="sidebar-icon" src={assets.order_icon} alt="" />
          <span className="sidebar-option-text">Orders</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <p className="sidebar-version">HMFD Admin v1.0</p>
      </div>
    </div>
  )
}

export default Sidebar