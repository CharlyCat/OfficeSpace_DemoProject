import React, { useState, useContext } from 'react';
import './officeadd.css';
import { DataContext } from './DataContext';
import backArrowIcon from './assets/arrow-left.svg';
import {generateUUID} from './Utils'

const OfficeAdd = ({ onBack }) => {
  const { officeData, setOfficeData } = useContext(DataContext);
  const [officeName, setOfficeName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [officeColour, setOfficeColour] = useState('');
  const colors = ['#FFBE0B', '#FF9B71', '#FB5607', '#97512C', '#DBBADD', '#FF006E', '#A9F0D1', '#00B402', '#489DDA', '#0072E8', '#B19CD9'];

  const handleAddOffice = () => {
    const newOffice = {
      Id: generateUUID(),
      Name: officeName,
      Description: address,
      Capacity: parseInt(capacity),
      People: [],
      contactNumber: phone,
      email: email,
      address: address,
      officeColour: officeColour,
    };

    setOfficeData([...officeData, newOffice]);
    onBack(); // Navigate back to the office list
  };


  return (
    <div className="add-office-container">
      <button className="add-office-back-button" onClick={onBack}>
        <img src={backArrowIcon} alt="Back" className="add-office-back-arrow-icon" />
        <p className="add-office-back-button-text">New Office</p>
      </button>
      <form className="add-office-form" onSubmit={(e) => { e.preventDefault(); handleAddOffice(); }}>
        <div className="form-group">
          <label>Office Name</label>
          <input
            type="text"
            placeholder="Office Name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Physical Address</label>
          <input
            type="text"
            placeholder="Physical Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Maximum Capacity</label>
          <input
            type="number"
            placeholder="Maximum Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Office Colour</label>
          <div className="add-office-color-picker">
            <div className="add-office-color-row">
              {colors.slice(0, 6).map((colour) => (
                <span
                  key={colour}
                  className={`add-office-color-swatch ${officeColour === colour ? 'selected' : ''}`}
                  style={{ backgroundColor: colour }}
                  onClick={() => setOfficeColour(colour)}
                />
              ))}
            </div>
            <div className="add-office-color-row">
              {colors.slice(6).map((colour) => (
                <span
                  key={colour}
                  className={`add-office-color-swatch ${officeColour === colour ? 'selected' : ''}`}
                  style={{ backgroundColor: colour }}
                  onClick={() => setOfficeColour(colour)}
                />
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="add-office-button">ADD OFFICE</button>
      </form>
    </div>
  );
};

export default OfficeAdd;

