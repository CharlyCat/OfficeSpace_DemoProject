import React, { createContext, useState, useEffect } from 'react';
import officesImported from './Data/officeData.json';
import staffImported from './Data/staffData.json';

/** Context to access data across componets */
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [officeData, setOfficeData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [activeOfficeId, setActiveOfficeId] = useState(null);
  const [isOfficeEditing, setIsOfficeEditing] = useState(null);

  useEffect(() => {
    setOfficeData(officesImported.offices);
    setStaffData(staffImported.staff);
  }, []);

  return (
    <DataContext.Provider 
    value={{ 
        officeData, 
        setOfficeData, 
        staffData, 
        setStaffData, 
        activeOfficeId,
        setActiveOfficeId,
        isOfficeEditing,
        setIsOfficeEditing
    }}>
      {children}
    </DataContext.Provider>
  );
};
