import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContext';
import './officeedit.css';
import backArrowIcon from './assets/arrow-left.svg';

const OfficeEdit = ({ office, onBack, isNew }) => {
  const { officeData, setOfficeData, setActiveOfficeId} = useContext(DataContext);
  const [formData, setFormData] = useState({ ...office });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleColourChange = (colour) => {
    setFormData({
      ...formData,
      officeColour: colour,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOfficeData = officeData.map((o) =>
      o.Id === office.Id ? formData : o
    );
    setOfficeData(updatedOfficeData);
    onBack();
  };

  const handleDelete = () => {
    console.log('Deleting office with Id:', office.Id);
    const updatedOfficeData = officeData.filter((o) => o.Id !== office.Id);
    console.log('Updated office data:', updatedOfficeData);
    setOfficeData(updatedOfficeData);
    setActiveOfficeId(null);
    onBack();
  };

  return (
    <div className="edit-office-container">
        <button className="back-button" 
                  onClick={onBack}>
              <img src={backArrowIcon} alt="Back" className="back-arrow-icon" />
              <span>
              <p className="back-button-text">{isNew ? 'Add Office' : 'Edit Office'}</p>
              </span>
          </button>
      <form className="edit-office-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>NAME</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Office Name"
          />
        </div>
        <div className="form-group">
        <label>ADDRESS</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Physical Address"
          />
        </div>
        <div className="form-group">
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <label>CONTACT NUMBER</label>
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <label>COFFICE CAPICITY</label>
          <input
            type="number"
            name="Capacity"
            value={formData.Capacity}
            onChange={handleChange}
            placeholder="Maximum Capacity"
          />
        </div>
        <div className="form-group">
          <label>OFFICE COLOUR</label>
          <div className="color-picker">
            {['#FFBE0B', '#FF9B71', '#FB5607', '#97512C', '#DBBADD', '#FF006E', '#A9F0D1', '#00B402', '#489DDA', '#0072E8'].map((colour) => (
              <span
                key={colour}
                className={`color-swatch ${formData.officeColour === colour ? 'selected' : ''}`}
                style={{ backgroundColor: colour }}
                onClick={() => handleColourChange(colour)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="update-button">{isNew ? 'ADD OFFICE' : 'UPDATE OFFICE'}</button>
        <button type="button" className="delete-button" onClick={handleDelete}>DELETE OFFICE</button>
      </form>
    </div>
  );
};

OfficeEdit.propTypes = {
  office: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default OfficeEdit;
