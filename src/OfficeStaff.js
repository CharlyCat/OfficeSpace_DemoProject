import React, { useContext, useState, useEffect } from 'react';
import './officeapp.css';
import { DataContext } from './DataContext';
import manageIcon from './assets/more-nav.svg';
import searchIcon from './assets/search.svg';
import avatar1 from './assets/Avatar1.svg';
import avatar2 from './assets/Avatar2.svg';
import avatar3 from './assets/Avatar3.svg';
import avatar4 from './assets/Avatar4.svg';
import avatar5 from './assets/Avatar5.svg';
import avatar6 from './assets/Avatar6.svg';
import avatar7 from './assets/Avatar7.svg';
import EditStaffMemberPopup from './EditStaffMemberPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

const avatarMap = {
  'avatar1.svg': avatar1,
  'avatar2.svg': avatar2,
  'avatar3.svg': avatar3,
  'avatar4.svg': avatar4,
  'avatar5.svg': avatar5,
  'avatar6.svg': avatar6,
  'avatar7.svg': avatar7,
};

//Render Single Office accordion and Staff member list
const OfficeStaff = () => {
  const {activeOfficeId, staffData, officeData, setStaffData, setOfficeData,setIsEditOverlayOpen, staffId, setStaffId } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [activeOfficeStaff, setActiveOfficeStaff] = useState(()=> {
    let currentActiveOffice = officeData.find((singleOffice) => singleOffice.Id === activeOfficeId);
    let results = (currentActiveOffice) ? currentActiveOffice.People : [];
    return results
  });

  console.log('OfficeStaff!!!!')
  console.log('activeOfficeStaff =', activeOfficeStaff)
  console.log('staffId =', staffId)
  useEffect(() => {
    const currentActiveOffice = officeData.find((singleOffice) => singleOffice.Id === activeOfficeId);
    const results = currentActiveOffice ? currentActiveOffice.People : [];
    setActiveOfficeStaff(results);
  }, [activeOfficeId, officeData, staffData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterStaffBasedOnQuery = (officePeople) => {
    // searchQuery empty or only whitespace, return the full list of active office staff
    if (!searchQuery || searchQuery.trim() === '') {
      return activeOfficeStaff;
    }
    // List of all staff members that are part of the active office, this includes the full names
    const activeStaffWithNames = officePeople.map(personId => {
      // Find the full staff data for each person in officePeople
      return staffData.find(staff => staff.id === personId);
    }).filter(Boolean); // Filter out any undefined values in case of missing staff data
  
    // Filter the active staff list based on the search query
    const filteredStaff = activeStaffWithNames.filter((person) => {
      let staffName = `${person.firstName} ${person.lastName}`;
      let found = staffName.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return found;
    });
    let filteredStaffListOnlyIds = [];
    filteredStaff.map((staffMember) =>{
      filteredStaffListOnlyIds.push(staffMember.id);
    })

    // Return the list of filtered staff members
    return filteredStaffListOnlyIds;
  };
  
  const handleEditClick = (staffId) => {
    console.log('Edit Staff Button Clicked'); //TODO Working 
    console.log('staffId');
    setStaffId(staffId);
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowEditPopup(false);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    const updatedStaffData = staffData.filter((staff) => staff.id !== staffId);
    setStaffData(updatedStaffData);
  
    let allOfficeData = [...officeData];
    let currentActiveOfficeIndex = allOfficeData.findIndex((singleOffice) => singleOffice.Id === activeOfficeId);
    let currentActiveOffice = null;
  
    if (currentActiveOfficeIndex > -1) {
      currentActiveOffice = allOfficeData[currentActiveOfficeIndex];
    } else {
      console.error('Office not found');
      return;
    }
    let indexToBeDeleted = currentActiveOffice.People.findIndex((item) => item === staffId);
  
    if (indexToBeDeleted === -1) {
      console.error('Staff member to be deleted not found');
      return;
    }
    currentActiveOffice.People.splice(indexToBeDeleted, 1);
    setOfficeData(allOfficeData);
    setShowDeletePopup(false);
  };
  

  const handleEditStaff = () => {
    console.log('OfficeStaff - handleEdite Staff')
    setIsEditOverlayOpen(true);
    setShowEditPopup(false);
    setStaffId(staffId);
  };
  
  return (
    <div className="office-staff-container">
      <div key={'officeId-' + activeOfficeId} className="office-card card">
        <div className="staff-list">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
          <h3>Staff Members In Office</h3>
          <ul>
            {!activeOfficeStaff.length ? (
              <li className="staff-list-item">
                <span>No Staff Found</span>
              </li>
            ) : (
              filterStaffBasedOnQuery(activeOfficeStaff).map((personId) => {
                const person = staffData.find((p) => p.id === personId);
                return person ? (
                    <li key={person.id} className="staff-list-item">
                    <div className="staff-details">
                      <img src={avatarMap[person.avatar]} alt={`${person.firstName} ${person.lastName}`} className="avatar" />
                      <span className="staff-name">{person.firstName} {person.lastName}</span>
                    </div>
                      <button className="manage-button" onClick={() => handleEditClick(person.id)}>
                      <img src={manageIcon} alt="Manage Staff" title="Manage Staff Member" />
                    </button>
                  </li>
                ) : null;
              })
            )}
          </ul>
        </div>
      </div>
      {showEditPopup && (
        <EditStaffMemberPopup
          onEdit={() =>handleEditStaff ()}
          onDelete={handleDeleteClick}
          onClose={() => setShowEditPopup(false)}
        />
      )}
      {showDeletePopup && (
        <ConfirmDeletePopup
          onConfirmDelete={handleConfirmDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}      
    </div>
  );
};

export default OfficeStaff;
