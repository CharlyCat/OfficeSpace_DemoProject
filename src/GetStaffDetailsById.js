import React, { useContext } from 'react';
import { DataContext } from './DataContext';

export const GetStaffDetailsById = () => {
    const { staffId, staffData } = useContext(DataContext);
      if (!staffId) {
        console.error('getStaff - staffId received is empty')
        return {}
      }
  
      let staffDetails = staffData.find((person) => person.id === staffId)
      if (staffDetails) {
        return staffDetails
      }else {
        console.error('getStaff - staff details not found for staff id ', staffId)
        return {}
      }
  }