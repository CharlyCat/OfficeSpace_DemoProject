import React from 'react';
import PropTypes from 'prop-types';
import './popup.css';

const ConfirmDeletePopup = ({ onConfirmDelete, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onCancel}>&times;</button>
        <h2>Are You Sure You Want To Delete Staff Member?</h2>
        <button className="confirm-delete-button" onClick={onConfirmDelete}>DELETE STAFF MEMBER</button>
        <button className="cancel-button" onClick={onCancel}>KEEP STAFF MEMBER</button>
      </div>
    </div>
  );
};

ConfirmDeletePopup.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeletePopup;
