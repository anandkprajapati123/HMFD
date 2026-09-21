import React from 'react';
import './AdminDetailPopup.css';
import { assets } from '../../assets/assets';

const AdminDetailPopup = ({ setShowAdminDetail }) => {
  return (
    <div className='admin-detail-overlay' onClick={() => setShowAdminDetail(false)}>
      <div className='admin-detail-modal' onClick={(e) => e.stopPropagation()}>
        <div className='admin-detail-header'>
          <h3>Admin Details</h3>
          <button className='close-btn' onClick={() => setShowAdminDetail(false)}>✕</button>
        </div>

        <div className='admin-detail-body'>
          <div className='admin-profile-section'>
            <img className='admin-avatar' src={assets.profile_image} alt="Admin Profile" />
            <div className='admin-main-info'>
              <h4>Anand Prajapati</h4>
              <span className='role-badge'>Super Admin</span>
              <span className='status-badge'>🟢 Active</span>
            </div>
          </div>

          <div className='admin-info-grid'>
            <div className='info-item'>
              <span className='info-label'>Email</span>
              <span className='info-value'>admin@hmfd.com</span>
            </div>
            <div className='info-item'>
              <span className='info-label'>Phone</span>
              <span className='info-value'>+91 98765 43210</span>
            </div>
            <div className='info-item'>
              <span className='info-label'>Access Level</span>
              <span className='info-value'>Full Control</span>
            </div>
            <div className='info-item'>
              <span className='info-label'>Joined</span>
              <span className='info-value'>September 2026</span>
            </div>
          </div>

          <div className='permissions-section'>
            <h5>Admin Permissions</h5>
            <ul className='permissions-list'>
              <li>✅ Add, edit & delete menu items</li>
              <li>✅ View and update customer order status</li>
              <li>✅ Manage database and system configurations</li>
            </ul>
          </div>
        </div>

        <div className='admin-detail-footer'>
          <button className='btn-secondary' onClick={() => setShowAdminDetail(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPopup;
