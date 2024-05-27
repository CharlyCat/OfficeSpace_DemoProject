import React, {useState} from 'react';
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

export const EditStaffOverlayStep1 = ({ onNext, onClose, staffName, setStaffName, staffSurname, setStaffSurname }) => {
    console.log('staffName =',staffName)
    console.log('staffSurname =',staffSurname)
    const [localName, setLocalName] =useState(staffName);
    const [localSurname, setLocalSurname] =useState(staffSurname);

    const handleNext = (e) => {
      e.preventDefault();
      onNext();
    };

    const onHandleNameChange = (event) => {
      let newName = event.target.value;
      setLocalName(newName);
      setStaffName(newName);
    };

    const onHandleSurnameChange = (event) => {
      let newSurname = event.target.value;
      setLocalSurname(newSurname);
      setStaffSurname(newSurname);
    };
  
    return (
      <div className="addstaff-overlay">
        <div className="addstaff-overlay-content">
          <div className="addstaff-overlay-header">
            <h2>Edit Staff Member</h2>
            <button className="addstaff-close-button" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <form onSubmit={handleNext} className="addstaff-overlay-form">
            <div className="addstaff-input-group">
              <input
                type="text"
                placeholder="First Name"
                value={localName}
                onChange={(e) => onHandleNameChange(e)}
                required
              />
            </div>
            <div className="addstaff-input-group">
              <input
                type="text"
                placeholder="Last Name"
                value={localSurname}
                onChange={(e) => onHandleSurnameChange(e)}
                required
              />
            </div>
            <div className="addstaff-overlay-footer">
              <button type="submit" className="addstaff-next-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export const EditStaffOverlayStep2 = ({ onBack, onSave, onClose, selectedAvatar, setSelectedAvatar }) => {
    const [localAvatar, setLocalAvatar] =useState(selectedAvatar);
    const avatars = Object.keys(avatarMap);

    const onHandleAvatarChange = (selectedAvatar) => {
      setLocalAvatar(selectedAvatar);
      setSelectedAvatar(selectedAvatar);
    };

    const handleSave = (e) => {
      e.preventDefault();
      onSave();
    };
  
    return (
      <div className="addstaff-overlay">
        <div className="addstaff-overlay-content">
          <div className="addstaff-overlay-header">
            <button className="addstaff-back-button" onClick={onBack}>
              <img src={backArrowIcon} alt="Back" />
            </button>
            <h2>Edit Staff Member</h2>
            <button className="addstaff-close-button" onClick={onClose}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <h3 className="addstaff-avatar-heading">Avatar</h3>
          <div className="addstaff-avatar-selection">
            {avatars.map((avatarKey, index) => (
              <img
                key={index}
                src={avatarMap[avatarKey]}
                alt={`Avatar ${index + 1}`}
                className={`addstaff-avatar-icon ${localAvatar === avatarMap[avatarKey] ? 'selected' : ''}`}
                onClick={() => onHandleAvatarChange(avatarMap[avatarKey])}
              />
            ))}
          </div>
          <div className="addstaff-overlay-footer">
            <button type="button" className="addstaff-save-button" onClick={handleSave}>UPDATE STAFF MEMBER</button>
          </div>
        </div>
      </div>
    );
  };