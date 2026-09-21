import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import AdminDetailPopup from '../AdminDetailPopup/AdminDetailPopup'

function Navbar() {
  const [showAdminDetail, setShowAdminDetail] = useState(false);
  const [adminInfo, setAdminInfo] = useState(() => {
    const saved = localStorage.getItem("adminInfo");
    return saved ? JSON.parse(saved) : {
      name: "Anand Prajapati",
      email: "admin@hmfd.com",
      phone: "+91 98765 43210",
      role: "Super Admin"
    };
  });

  const handleUpdateAdminInfo = (newInfo) => {
    setAdminInfo(newInfo);
    localStorage.setItem("adminInfo", JSON.stringify(newInfo));
  };

  return (
    <>
      {showAdminDetail && (
        <AdminDetailPopup 
          setShowAdminDetail={setShowAdminDetail} 
          adminInfo={adminInfo} 
          onSave={handleUpdateAdminInfo} 
        />
      )}
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Admin Logo" />

        <div className="navbar-right" onClick={() => setShowAdminDetail(true)} style={{ cursor: 'pointer' }}>
          <div className="navbar-user-info">
            <span className="navbar-user-name">{adminInfo.name}</span>
            <span className="navbar-user-role">{adminInfo.role}</span>
          </div>
          <img className='profile' src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </>
  )
}

export default Navbar