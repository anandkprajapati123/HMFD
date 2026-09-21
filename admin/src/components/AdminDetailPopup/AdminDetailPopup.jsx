import React, { useState } from 'react';
import './AdminDetailPopup.css';
import { assets } from '../../assets/assets';

const AdminDetailPopup = ({ setShowAdminDetail, adminInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...adminInfo });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className='admin-detail-overlay' onClick={() => setShowAdminDetail(false)}>
      <div className='admin-detail-modal' onClick={(e) => e.stopPropagation()}>
        <div className='admin-detail-header'>
          <h3>Admin Profile Details</h3>
          <button className='close-btn' onClick={() => setShowAdminDetail(false)}>✕</button>
        </div>

        <div className='admin-detail-body'>
          <div className='admin-profile-section'>
            <img className='admin-avatar' src={assets.profile_image} alt="Admin Profile" />
            <div className='admin-main-info'>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="edit-input name-input"
                    placeholder="Admin Name"
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="edit-input role-input"
                    placeholder="Role"
                  />
                </>
              ) : (
                <>
                  <h4>{adminInfo.name}</h4>
                  <span className='role-badge'>{adminInfo.role}</span>
                  <span className='status-badge'>🟢 Active</span>
                </>
              )}
            </div>
          </div>

          <div className='admin-info-grid'>
            <div className='info-item'>
              <span className='info-label'>Email</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <span className='info-value'>{adminInfo.email}</span>
              )}
            </div>
            <div className='info-item'>
              <span className='info-label'>Phone</span>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <span className='info-value'>{adminInfo.phone}</span>
              )}
            </div>
            <div className='info-item'>
              <span className='info-label'>Access Level</span>
              <span className='info-value'>Full Control</span>
            </div>
            <div className='info-item'>
              <span className='info-label'>Status</span>
              <span className='info-value' style={{ color: '#059669' }}>Active</span>
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
          {isEditing ? (
            <>
              <button className='btn-secondary' onClick={() => setIsEditing(false)}>Cancel</button>
              <button className='btn-primary' onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <>
              <button className='btn-secondary' onClick={() => setShowAdminDetail(false)}>Close</button>
              <button className='btn-primary' onClick={() => setIsEditing(true)}>Edit Details</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPopup;
