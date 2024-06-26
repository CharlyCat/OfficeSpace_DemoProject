import React, { useContext, useState } from 'react';
import './officeapp.css';
import { DataContext, OfficeRenderStatus } from './DataContext';
import OfficeCard from './OfficeCard';
import OfficeStaff from './OfficeStaff';
import OfficeEdit from './OfficeEdit';
import OfficeAdd from './OfficeAdd';
import backArrowIcon from './assets/arrow-left.svg';
import plusButton from './assets/plusbutton.svg';
import {AddStaffOverlayStep1, AddStaffOverlayStep2 } from './AddStaffOverlay';
import {EditStaffOverlayStep1, EditStaffOverlayStep2 } from './EditStaffOverlay';
import {generateUUID} from './Utils';
import { GetStaffDetailsById } from './GetStaffDetailsById';
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
  const { officeData, setOfficeData, activeOfficeId, setActiveOfficeId, staffData, setStaffData, 
          officeRenderStatus, setOfficeRenderStatus, staffId, setStaffId, isEditOverlayOpen, setIsEditOverlayOpen } = useContext(DataContext);
  const activeOffice = officeData.find(office => office.Id === activeOfficeId);
  
  const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [staffName, setStaffName] = useState('');
  const [staffSurname, setStaffSurname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  //Handle Back Navigation from Office
  const onHandleBackNav = () => {
    setOfficeRenderStatus(OfficeRenderStatus.LIST_ALL);
    setActiveOfficeId(null);
  };

  const onNext = () => {
    setCurrentStep(2);
  };
  
  const onBack = () => {
    setCurrentStep(1);
  };
  
  const onSaveAddStaffMember = () => {
    const newId = generateUUID();
    const newStaffMember = {
      id: newId,
      firstName: staffName,
      lastName: staffSurname,
      avatar: Object.keys(avatarMap).find(key => avatarMap[key] === selectedAvatar),
    };

    //Update staffData with new staff member
    setStaffData([...staffData, newStaffMember]);
    const updatedOfficeData = officeData.map(office => 
      office.Id === activeOfficeId 
        ? { ...office, People: [...office.People, newId] } 
        : office
    );
    setOfficeData(updatedOfficeData);

    // Close overlay and reset state
    setIsAddOverlayOpen(false);
    setCurrentStep(1);
    setStaffName('');
    setStaffId('');
    setStaffSurname('');
    setSelectedAvatar(null);
  };

  const onSaveEditStaffMember = () => {
    const updatedStaffMember = {
      id: staffId, 
      firstName: staffName,
      lastName: staffSurname,
      avatar: Object.keys(avatarMap).find(key => avatarMap[key] === selectedAvatar),
    };
    //Update staffData in Context
    setStaffData((previousData) => {
      // Ensure previousData and previousData.staff are defined and staff is an array
      if (!previousData || !Array.isArray(previousData)) {
        console.error('PreviousData or PreviousData.staff is not properly defined:', previousData);
        return previousData; // Return the original state if it's not properly defined
      }
    
      // Map over the 'staff' array to update the specific staff member
      const updatedStaff = previousData.map((item) => {
        if (item.id === staffId) {
          return updatedStaffMember; //return the updated staff member
        }
        return item; //return the original staff member, unedited
      });
    
      // Return the new state object with the updated 'staff' array
      return updatedStaff;
    });

    // Close overlay and reset state
    setIsEditOverlayOpen(false);
    setCurrentStep(1);
    setStaffName('');
    setStaffId('');
    setStaffSurname('');
    setSelectedAvatar(null);
  };
  

  const onCloseStaffMember = () => {
    setIsEditOverlayOpen(false);
    setIsAddOverlayOpen(false);
    setCurrentStep(1);
    setStaffName('');
    setStaffId('');
    setStaffSurname('');
    setSelectedAvatar(null);
  };

  const handleEditOfficeBack = () => {
    setOfficeRenderStatus(OfficeRenderStatus.LIST_ALL);
    setActiveOfficeId(null);

  };

  const onHandleAddOffice = () => {
    setOfficeRenderStatus(OfficeRenderStatus.ADD_MODE);
  }

  const onHandleAddStaff = () => {
    //Get the capacity of the active office staff being added too
    const activeOfficeCapacity = activeOffice.Capacity
    if(activeOffice.People.length < activeOfficeCapacity)
    {
      setIsAddOverlayOpen(true)
    } else {
      //Show warning pop-up that the office is at capacity
      alert('The office is at full capacity. Unable to add more staff.');
    }
  }
  
  const renderAllOfficeOrEditOffice = () => {
    console.log('officeRenderStatus',officeRenderStatus)

    switch (officeRenderStatus) {
      case OfficeRenderStatus.ADD_MODE:
            return <OfficeAdd onBack={handleEditOfficeBack}/>
      case OfficeRenderStatus.EDIT_MODE:
            return <OfficeEdit office={activeOffice} onBack={handleEditOfficeBack}/>
      case OfficeRenderStatus.VIEW_MODE:
        return renderSingleOfficeWithStaffView();            
      case OfficeRenderStatus.LIST_ALL:          
      default: 
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
                  onClick={onHandleAddOffice}
              />
            </>)
    }
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
        <div>
          <OfficeStaff/>
          <img src={plusButton} 
                alt="Add Staff" 
                className="plus-button staff-plus-button" 
                title="Add New Staff Member"
                onClick={onHandleAddStaff}
          />
         </div>
     </>)
    
  }

  const renderEditStaff = () => {
    let staffDetails = GetStaffDetailsById();
    console.log('renderEditStaff')
    console.log('staffDetails =',staffDetails)

    if(isEditOverlayOpen){
      if(currentStep === 1){
        return <EditStaffOverlayStep1
        onNext={onNext}
        onClose={onCloseStaffMember}
        staffId={staffDetails.id}
        staffName={staffDetails.firstName}
        setStaffName={setStaffName}
        staffSurname={staffDetails.lastName}
        setStaffSurname={setStaffSurname}
      />
      }else{
        return <EditStaffOverlayStep2
        onBack={onBack}
        onSave={onSaveEditStaffMember}
        onClose={onCloseStaffMember}
        selectedAvatar={staffDetails.avatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      }
    }
  }

  return (
    <div className="container">
      {renderAllOfficeOrEditOffice()}

      {isAddOverlayOpen && (
        currentStep === 1 ? (
          <AddStaffOverlayStep1
            onNext={onNext}
            onClose={onCloseStaffMember}
            setStaffName={setStaffName}
            setStaffSurname={setStaffSurname}
          />
        ) : (
          <AddStaffOverlayStep2
            onBack={onBack}
            onSave={onSaveAddStaffMember}
            onClose={onCloseStaffMember}
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        )
      )}

      {renderEditStaff()}
      
    </div>
  );
}

export default OfficeApp;
