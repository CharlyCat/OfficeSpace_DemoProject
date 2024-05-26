import React, { useContext, useState } from 'react';
import './officeapp.css';
import { DataContext } from './DataContext';
import OfficeCard from './OfficeCard';
import OfficeStaff from './OfficeStaff';
import OfficeEdit from './OfficeEdit';
import backArrowIcon from './assets/arrow-left.svg';
import plusButton from './assets/plusbutton.svg';
import {AddStaffOverlayStep1, AddStaffOverlayStep2 } from './AddStaffOverlay';
import {generateUUID} from './Utils';
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

function OfficeApp() {
  const { officeData, setOfficeData, activeOfficeId, setActiveOfficeId, staffData, setStaffData, isOfficeEditing, setIsOfficeEditing } = useContext(DataContext);
  const activeOffice = officeData.find(office => office.Id === activeOfficeId);
  
  //States for Add staff memeber
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [staffName, setStaffName] = useState('');
  const [staffSurname, setStaffSurname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  //const [isOfficeEditing, setIsOfficeEditing] = useState(activeOfficeId === null || !activeOfficeId);//TODO: should this be a useEffect?

  //Handle Back Navigation from Office
  const onHandleBackNav = () => {
    setIsOfficeEditing(false)
    setActiveOfficeId(null)
  };

  //Handlers to add new staff memeber
  const onNext = () => {
    setCurrentStep(2);
  };
  const onBack = () => {
    setCurrentStep(1);
  };
  const onSave = () => {
    const newId = generateUUID();
    const newStaffMember = {
      id: newId,
      firstName: staffName,
      lastName: staffSurname,
      avatar: Object.keys(avatarMap).find(key => avatarMap[key] === selectedAvatar),
    };

    //Update Data with new staff member
    setStaffData([...staffData, newStaffMember]);
    const updatedOfficeData = officeData.map(office => 
      office.Id === activeOfficeId 
        ? { ...office, People: [...office.People, newId] } 
        : office
    );
    setOfficeData(updatedOfficeData);

    // Close overlay and reset state
    setIsOverlayOpen(false);
    setCurrentStep(1);
    setStaffName('');
    setStaffSurname('');
    setSelectedAvatar(null);
  };
  const onClose = () => {
    setIsOverlayOpen(false);
    setCurrentStep(1);
    setStaffName('');
    setStaffSurname('');
    setSelectedAvatar(null);
  };

  const handleEditOffice = () => {
    setIsOfficeEditing(true);
  };

  const handleEditOfficeBack = () => {
    setIsOfficeEditing(false);
    setActiveOfficeId(null)
  };

  const onHandleAddStaff = () => {
    //Get the capacity of the active office staff being added too
    const activeOfficeCapacity = activeOffice.Capacity
    if(activeOffice.People.length < activeOfficeCapacity)
    {
      setIsOverlayOpen(true)
    } else {
      //Show warning pop-up that the office is at capacity
      alert('The office is at full capacity. Unable to add more staff.');
    }
  }
  
  const renderAllOfficeOrEditOffice =()=>{
    if(!isOfficeEditing)
      return (<>
        <h2 className="header">All Offices</h2>
        {officeData.map((office) => (
          <OfficeCard key={office.Id} 
                      singleOfficeData={office} />
        ))}
        <img src={plusButton} 
            alt="Add Office" 
            className="plus-button main-plus-button" 
            title="Add New Office"
        />
      </>)
    else return ( //Else you are editing a office card
      <OfficeEdit isNew={false} office={activeOffice} onBack={handleEditOfficeBack}/>
    )
  }
  const renderSingleOfficeWithStaffView = () => {
    return (
      <>
        <button className="back-button" 
                onClick={onHandleBackNav}>
            <img src={backArrowIcon} alt="Back" className="back-arrow-icon" />
            <span className="back-button-text">Office</span>
        </button>
        <OfficeCard key={activeOffice.Id} 
                    singleOfficeData={activeOffice} />
        <OfficeStaff/>
        <img src={plusButton} 
              alt="Add Staff" 
              className="plus-button main-plus-button" 
              title="Add New Staff Member"
              onClick={onHandleAddStaff}
        />
     </>)
    
  }

  return (
    <div className="container">
      {!activeOffice ? 
        renderAllOfficeOrEditOffice()
      :
        renderSingleOfficeWithStaffView()
      }

      {isOverlayOpen && (
        currentStep === 1 ? (
          <AddStaffOverlayStep1
            onNext={onNext}
            onClose={onClose}
            staffName={staffName}
            setStaffName={setStaffName}
            staffSurname={staffSurname}
            setStaffSurname={setStaffSurname}
          />
        ) : (
          <AddStaffOverlayStep2
            onBack={onBack}
            onSave={onSave}
            onClose={onClose}
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        )
      )}

    </div>
  );
}

export default OfficeApp;
