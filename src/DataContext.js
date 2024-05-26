import React, { createContext, useState, useEffect } from 'react';
import officesImported from './Data/officeData.json';
import staffImported from './Data/staffData.json';

export const OfficeRenderStatus = {
  LIST_ALL: 'list_all',//Show all the offices
  EDIT_MODE: 'edit_mode',//edit the active office
  ADD_MODE: 'add_mode',//add a new office
  VIEW_MODE: 'view_mode',//view the staff on the office
};

/** Context to access data across componets */
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [officeData, setOfficeData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [activeOfficeId, setActiveOfficeId] = useState(null);
  const [staffId, setStaffId] = useState(null);
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
        officeRenderStatus,
        setOfficeRenderStatus,
        staffId,
        setStaffId

    }}>
      {children}
    </DataContext.Provider>
  );
};
