
import {MdOutlineEdit} from "react-icons/md"

import {useState} from 'react'




function DriverRow(props){
    const [localDriver, setLocalDriver] = useState(props.driverDetails)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        driverFirstName: props.driverDetails.firstName,
        driverLastName: props.driverDetails.lastName,
        driverStreetAddress: props.driverDetails.addressLine1,
        driverCity: props.driverDetails.city,
        driverZipcode: props.driverDetails.zipcode
    })

    function handleFormChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleEditClicked(){
        setEditing(true)
    }

    function handleSaveClick(){

    }

    function handleDiscardClicked(){
        setEditing(false)

        // Put all form data back to their original values
        setFormData({
            driverFirstName: props.driverDetails.firstName,
            driverLastName: props.driverDetails.lastName,
            driverStreetAddress: props.driverDetails.addressLine1,
            driverCity: props.driverDetails.city,
            driverZipcode: props.driverDetails.zipcode
        })
    }

    function handleDeleteClicked(){
        setEditing(false)
        props.handleRemoveClick(props.driverDetails.id)
    }

    <>
    <input type="checkbox" className="driver-row-checkbox" value={props.driverDetails.id} onChange={props.handleCheck}/>
    {props.driverDetails.firstName} {props.driverDetails.lastName}
    </>

    return(
        <>
            {editing ?
            <>
            <span className="rider-list-rider-name">
                <span>First Name: </span>
                <input 
                    style={{width: "25%"}}
                    type="text"
                    onChange = {handleFormChange}
                    name="driverFirstName"
                    value={formData.driverFirstName}
                />

                <span>&nbsp;&nbsp;Last Name: </span>
                <input
                    style={{width: "25%"}}
                    type="text"
                    onChange = {handleFormChange}
                    name="driverLastName"
                    value={formData.driverLastName}
                />
                
            </span>

            <span className="rider-list-rider-address">
                <span>Street: </span>
                <input 
                    style={{width: "30%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="driverStreetAddress"
                    value={formData.driverStreetAddress}
                />
  
                <span>&nbsp;&nbsp;City: </span>
                <input 
                    style={{width: "20%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="driverCity"
                    value={formData.driverCity}
                />
                <span>&nbsp;&nbsp;ZipCode: </span>
                <input 
                    style={{width: "20%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="driverZipcode"
                    value={formData.driverZipcode}
                />
            </span>

            <div className="edit-list-div">
                <span className="edit-list-buttons" onClick={()=> handleDeleteClicked()}>Delete</span>/
                <span className="edit-list-buttons" onClick={()=> handleDiscardClicked()}>Discard Changes</span>/
                <span className="edit-list-buttons" onClick={()=> handleSaveClick()}>Save</span>
            </div>
            </>:
            
            <>
            <span className="rider-list-rider-name"><input type="checkbox" className="driver-row-checkbox" value={props.driverDetails.id} onChange={props.handleCheck}/>{localDriver.firstName} {localDriver.lastName}</span> 
            <span className="rider-list-rider-address">{localDriver.addressLine1} {localDriver.addressLine2} {localDriver.city} {localDriver.zipcode}</span>
            <span className="rider-list-edit-icon"><MdOutlineEdit onClick={() => {handleEditClicked()}} color="blue"/></span>
            </>
            }
        </>
    )
}

export default DriverRow