import React, { useContext, useState } from 'react';
import './officeapp.css';
import { DataContext, OfficeRenderStatus } from './DataContext';
import pencilIcon from './assets/edit.svg';
import staffIcon from './assets/people.svg';
import phoneIcon from './assets/phone.svg';
import emailIcon from './assets/email.svg';
import locationIcon from './assets/location.svg';
import OfficeEdit from './OfficeEdit';

const OfficeCard = ({singleOfficeData}) => {
  const { setActiveOfficeId, setOfficeRenderStatus } = useContext(DataContext);
  const [expandedOfficeId, setExpandedOfficeId] = useState(null);
  

  //TODO: check that singleOfficeData is not null and if it is show and error message 

  console.log("singleOfficeData.People.length=",singleOfficeData.People.length)

  const handleToggle = (id) => {
    setExpandedOfficeId(expandedOfficeId === id ? null : id);
  };

  const handleShowStaffList = (id) => {
    setActiveOfficeId(id);
  };

  const handleEditOffice = () => {
    setOfficeRenderStatus(OfficeRenderStatus.EDIT_MODE);
    //setIsOfficeEditing(true);
  };

  // const handleBack = () => {
  //   setIsEditing(false);
  // };
  
  // if (isEditing) {
  //   return <OfficeEdit office={singleOfficeData} onBack={handleBack} isNew={false}/>;
  // }

  return (
    <div>
        <div className="office-card card">
          <div className="card-left" 
               style={{ backgroundColor: singleOfficeData.officeColour }}>
          </div>
          <div className="card-content">
            <div className="card-header">
              <h2 onClick={() => handleShowStaffList(singleOfficeData.Id)}>{singleOfficeData.Name}</h2>
              <span className="card-icon" 
                    onClick={handleEditOffice}>
                    <img src={pencilIcon} alt="Edit" />
              </span>
            </div>
            <div className="card-info" 
                 onClick={() => handleShowStaffList(singleOfficeData.Id)}>
              <p><img src={staffIcon} alt="Staff" /> {(singleOfficeData.People && Array.isArray(singleOfficeData.People)) ? singleOfficeData.People.length :  "0"} Staff Members in Office</p>
            </div>
            <div className="card-divider"></div>
            <div className="card-button-container">
              <button onClick={() => handleToggle(singleOfficeData.Id)} 
                      className="card-button">
                  More info {expandedOfficeId === singleOfficeData.Id ? <span>&#9650;</span> : <span>&#9660;</span>}
              </button>
            </div>
            {expandedOfficeId === singleOfficeData.Id && (
              <div className="card-details">
                <p><img src={phoneIcon} alt="Phone" /> {singleOfficeData.contactNumber}</p>
                <p><img src={emailIcon} alt="Email" /> {singleOfficeData.email}</p>
                <p><img src={staffIcon} alt="Staff" /> Office Capacity: {singleOfficeData.Capacity}</p>
                <p><img src={locationIcon} alt="Location" /> {singleOfficeData.address}</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default OfficeCard;
