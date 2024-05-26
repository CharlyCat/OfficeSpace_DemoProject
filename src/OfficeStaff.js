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
  const {activeOfficeId, staffData, officeData, setStaffData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [activeOfficeStaff, setActiveOfficeStaff] = useState(()=> {
    let currentActiveOffice = officeData.find((singleOffice) => singleOffice.Id === activeOfficeId);
    let results = (currentActiveOffice) ? currentActiveOffice.People : [];
    return results
  });

  useEffect(() => {
    const currentActiveOffice = officeData.find((singleOffice) => singleOffice.Id === activeOfficeId);
    const results = currentActiveOffice ? currentActiveOffice.People : [];
    setActiveOfficeStaff(results);
  }, [activeOfficeId, officeData, staffData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterStaff = (officePeople) => {
    if (!searchQuery || searchQuery === '' ) {
      return activeOfficeStaff;
    }
    return officePeople.filter((personId) => {
      const person = staffData.find((p) => p.Id === personId);
      return person && `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery);
    });
  };
  console.log('staff list =',staffData)
  
  const handleEditClick = (staffId) => {
    console.log("Edint staff ID", staffId)
    setSelectedStaff(staffId);
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowEditPopup(false);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    const updatedStaffData = staffData.filter((staff) => staff.id !== selectedStaff);
    setStaffData(updatedStaffData);
    setShowDeletePopup(false);
  };

  const handleEditStaff = () => {
    // Implement edit staff logic here
    setShowEditPopup(false);
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
              <p>No Staff Found</p>
            ) : (
              filterStaff(activeOfficeStaff).map((personId) => {
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
          onEdit={handleEditStaff}
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
