import React, { createContext, useState, useEffect } from 'react';
import officesImported from './Data/officeData.json';
import staffImported from './Data/staffData.json';

export const OfficeRenderStatus = {
  LIST_ALL: 'list_all',
  EDIT_MODE: 'edit_mode',
  ADD_MODE: 'add_mode'
};

/** Context to access data across componets */
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [officeData, setOfficeData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [activeOfficeId, setActiveOfficeId] = useState(null);
  const [officeRenderStatus, setOfficeRenderStatus] = useState(OfficeRenderStatus.LIST_ALL);

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
        isOfficeRenderStatus: officeRenderStatus,
        setOfficeRenderStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};
