import React, { useContext, useState } from 'react';
import './officeapp.css';
import { DataContext } from './DataContext';
import pencilIcon from './assets/edit.svg';
import staffIcon from './assets/people.svg';
import phoneIcon from './assets/phone.svg';
import emailIcon from './assets/email.svg';
import locationIcon from './assets/location.svg';
import plusButton from './assets/plusbutton.svg';
import avatar1 from './assets/Avatar1.svg';
import avatar2 from './assets/Avatar2.svg';
import avatar3 from './assets/Avatar3.svg';
import avatar4 from './assets/Avatar4.svg';
import avatar5 from './assets/Avatar5.svg';
import avatar6 from './assets/Avatar6.svg';
import avatar7 from './assets/Avatar7.svg';

const avatarMap = {
  'avatar1.svg': avatar1,
  'avatar2.svg': avatar2,
  'avatar3.svg': avatar3,
  'avatar4.svg': avatar4,
  'avatar5.svg': avatar5,
  'avatar6.svg': avatar6,
  'avatar7.svg': avatar7,
};

const OfficeCard = () => {
  const { offices, staff, showStaffList, setShowStaffList } = useContext(DataContext);
  const [expandedOfficeId, setExpandedOfficeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const handleToggle = (id) => {
    setExpandedOfficeId(expandedOfficeId === id ? null : id);
  };

  const handleShowStaffList = (id) => {
    setShowStaffList(showStaffList === id ? null : id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filterStaff = (officePeople) => {
    if (searchQuery === '') {
      return officePeople;
    }
    return officePeople.filter((personId) => {
      const person = staff.find((p) => p.id === personId);
      return person && `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery);
    });
  };

  return (
    <div>
      {offices.map((office) => (
        <div key={office.Id} className="office-card card">
          <div className="card-left" style={{ backgroundColor: office.officeColour }}></div>
          <div className="card-content">
            <div className="card-header">
              <h2 onClick={() => handleShowStaffList(office.Id)}>{office.Name}</h2>
              <span className="card-icon">
                <img src={pencilIcon} alt="Edit" />
              </span>
            </div>
            <div className="card-info" onClick={() => handleShowStaffList(office.Id)}>
              <p><img src={staffIcon} alt="Staff" /> {office.People.length} Staff Members in Office</p>
            </div>
            <div className="card-divider"></div>
            <div className="card-button-container">
              <button onClick={() => handleToggle(office.Id)} className="card-button">
                More info {expandedOfficeId === office.Id ? <span>&#9650;</span> : <span>&#9660;</span>}
              </button>
            </div>
            {expandedOfficeId === office.Id && (
              <div className="card-details">
                <p><img src={phoneIcon} alt="Phone" /> {office.contactNumber}</p>
                <p><img src={emailIcon} alt="Email" /> {office.email}</p>
                <p><img src={staffIcon} alt="Staff" /> Office Capacity: {office.Capacity}</p>
                <p><img src={locationIcon} alt="Location" /> {office.address}</p>
              </div>
            )}
            {showStaffList === office.Id && (
              <div className="staff-list">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <h3>Staff Members In Office</h3>
                <ul>
                {filterStaff(office.People).map((personId) => {
                    const person = staff.find((p) => p.id === personId);
                    return person ? (
                      <li key={person.id}>
                        <img src={avatarMap[person.avatar]} alt={`${person.firstName} ${person.lastName}`} />
                        <span>{person.firstName} {person.lastName}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
                <img src={plusButton} alt="Add Staff" className="plus-button staff-plus-button" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeCard;
