import React from 'react';
import PropTypes from 'prop-types';
import './popup.css';
import {EditStaffOverlay} from './EditStaffOverlay'

const EditStaffMemberPopup = ({ onEdit, onDelete, onClose }) => {
  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <button className="edit-button" onClick={onEdit}>EDIT STAFF MEMBER</button>
        <button className="delete-button" onClick={onDelete}>DELETE STAFF MEMBER</button>
      </div>
    </div>
  );
};

EditStaffMemberPopup.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditStaffMemberPopup;
