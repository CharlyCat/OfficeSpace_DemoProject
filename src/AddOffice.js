import React, { useState, useContext } from 'react';
import './addoffice.css';
import { DataContext } from './DataContext';

const AddOffice = ({ onBack }) => {
  const { offices, setOffices } = useContext(DataContext);
  const [officeName, setOfficeName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [capacity, setCapacity] = useState('');
  const [officeColour, setOfficeColour] = useState('');

  const handleAddOffice = () => {
    const newOffice = {
      Id: offices.length + 1,
      Name: officeName,
      Description: address,
      Capacity: parseInt(capacity),
      People: [],
      contactNumber: phone,
      email: email,
      address: address,
      officeColour: officeColour,
    };

    setOffices([...offices, newOffice]);
    onBack(); // Navigate back to the office list
  };

  return (
    <div className="add-office-container">
      <button className="back-button" onClick={onBack}>&larr;</button>
      <h2 className="title">New Office</h2>
      <input
        type="text"
        placeholder="Office Name"
        value={officeName}
        onChange={(e) => setOfficeName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Physical Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Maximum Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <div className="colour-selector">
        <h3>Office Colour</h3>
        <div className="colour-options">
          {['#FFDD00', '#FFA07A', '#FF4500', '#8B4513', '#DDA0DD', '#FF69B4', '#98FB98', '#00FF00', '#1E90FF', '#4169E1', '#9370DB'].map(colour => (
            <div
              key={colour}
              className="colour-option"
              style={{ backgroundColor: colour }}
              onClick={() => setOfficeColour(colour)}
            />
          ))}
        </div>
      </div>
      <button className="add-office-button" onClick={handleAddOffice}>ADD OFFICE</button>
    </div>
  );
};

export default AddOffice;

