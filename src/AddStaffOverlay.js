import React from 'react';
import './addstaffoverlay.css';
import closeIcon from './assets/close-circle.svg';
import backArrowIcon from './assets/arrow-left.svg';
import avatar1 from './assets/Avatar1.svg';
import avatar2 from './assets/Avatar2.svg';
import avatar3 from './assets/Avatar3.svg';
import avatar4 from './assets/Avatar4.svg';
import avatar5 from './assets/Avatar5.svg';
import avatar6 from './assets/Avatar6.svg';
import avatar7 from './assets/Avatar7.svg';

const avatarMap = {
  'avatar1.svg': avatar1,
  'avatar2.svg': avatar2,
  'avatar3.svg': avatar3,
  'avatar4.svg': avatar4,
  'avatar5.svg': avatar5,
  'avatar6.svg': avatar6,
  'avatar7.svg': avatar7,
};

export const AddStaffOverlayStep1 = ({ onNext, onClose, setStaffName, setStaffSurname }) => {
    const handleNext = (e) => {
      e.preventDefault();
      onNext();
    };
  
    return (
      <div className="addstaff-overlay">
        <div className="addstaff-overlay-content">
          <div className="addstaff-overlay-header">
            <h2>New Staff Member</h2>
            <button className="addstaff-close-button" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <form onSubmit={handleNext} className="addstaff-overlay-form">
            <div className="addstaff-input-group">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setStaffName(e.target.value)}
                required
              />
            </div>
            <div className="addstaff-input-group">
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setStaffSurname(e.target.value)}
                required
              />
            </div>
            <div className="addstaff-overlay-footer">
              <button type="submit" className="addstaff-next-button">NEXT</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export const AddStaffOverlayStep2 = ({ onBack, onSave, onClose, selectedAvatar, setSelectedAvatar }) => {
    const avatars = Object.keys(avatarMap);

    const handleSave = (e) => {
      e.preventDefault();
      onSave();
    };

    const onHandleAvatarSelection = (avatarKey) => {
      console.log('avatarKey =',avatarKey)
      console.log('avatarMap =',avatarMap)
      setSelectedAvatar(avatarMap[avatarKey])
    }
  
    return (
      <div className="addstaff-overlay">
        <div className="addstaff-overlay-content">
          <div className="addstaff-overlay-header">
            <button className="addstaff-back-button" onClick={onBack}>
              <img src={backArrowIcon} alt="Back" />
            </button>
            <h2>New Staff Member</h2>
            <button className="addstaff-close-button" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <h3 className="addstaff-avatar-heading">Avatar</h3>
          <div className="addstaff-avatar-selection">
            <div className="addstaff-avatar-row">
              {avatars.slice(0, 4).map((avatarKey, index) => (
                <img
                  key={index}
                  src={avatarMap[avatarKey]}
                  alt={`Avatar ${index + 1}`}
                  className={`addstaff-avatar-icon ${selectedAvatar === avatarMap[avatarKey] ? 'selected' : ''}`}
                  onClick={()=> onHandleAvatarSelection(avatarKey)}
                />
              ))}
            </div>
            <div className="addstaff-avatar-row">
              {avatars.slice(4).map((avatarKey, index) => (
                <img
                  key={index}
                  src={avatarMap[avatarKey]}
                  alt={`Avatar ${index + 1}`}
                  className={`addstaff-avatar-icon ${selectedAvatar === avatarMap[avatarKey] ? 'selected' : ''}`}
                  onClick={()=> onHandleAvatarSelection(avatarKey)}
                />
              ))}
            </div>
          </div>
          <div className="addstaff-overlay-footer">
            <button type="button" className="addstaff-save-button" onClick={handleSave}>ADD STAFF MEMBER</button>
          </div>
        </div>
      </div>
    );
  };