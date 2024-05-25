import React, { useContext, useState } from 'react';
import './officeapp.css';
import { DataContext } from './DataContext';
import OfficeCard from './OfficeCard';
import plusButton from './assets/plusbutton.svg';

function OfficeApp() {
  const { offices, showStaffList, setShowStaffList, activeOffice } = useContext(DataContext);
  const [isViewingOffice, setIsViewingOffice] = useState(false);

  return (
    <div className="container">
      <h2 className="header">All Offices</h2>
      <OfficeCard />
      <img src={plusButton} alt="Add Office" className="plus-button main-plus-button" />
    </div>
  );
}

export default OfficeApp;
