import React from 'react';
import './officeapp.css';
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

export const AddStaffOverlayStep1 = ({ onNext, onClose, staffName, setStaffName, staffSurname, setStaffSurname }) => {
    const handleNext = (e) => {
      e.preventDefault();
      onNext();
    };
  
    return (
      <div className="overlay">
        <div className="overlay-content">
          <h2>Add New Staff Member</h2>
          <form onSubmit={handleNext}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={staffSurname}
                onChange={(e) => setStaffSurname(e.target.value)}
                required
              />
            </div>
            <button type="submit">Next</button>
            <button type="button" onClick={onClose}>Close</button>
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
  
    return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Select Avatar</h2>
        <div className="avatar-selection">
          {avatars.map((avatarKey, index) => (
            <img
              key={index}
              src={avatarMap[avatarKey]}
              alt={`Avatar ${index + 1}`}
              className={`avatar-icon ${selectedAvatar === avatarMap[avatarKey] ? 'selected' : ''}`}
              onClick={() => setSelectedAvatar(avatarMap[avatarKey])}
            />
          ))}
        </div>
        <form onSubmit={handleSave}>
          <button type="submit">Save</button>
          <button type="button" onClick={onBack}>Back</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
  };