import React, { createContext, useState, useEffect } from 'react';
import officeData from './Data/officeData.json';
import staffData from './Data/staffData.json';

/** Context to access data across componets */
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [offices, setOffices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showStaffList, setShowStaffList] = useState(null);
  const [activeOffice, setActiveOffice] = useState(null);

  useEffect(() => {
    setOffices(officeData.offices);
    setStaff(staffData.staff);
  }, []);

  return (
    <DataContext.Provider 
    value={{ 
        offices, 
        setOffices, 
        staff, 
        setStaff, 
        showStaffList, 
        setShowStaffList,
        activeOffice,
        setActiveOffice
    }}>
      {children}
    </DataContext.Provider>
  );
};
