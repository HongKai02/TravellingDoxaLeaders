import {PiInfoThin} from "react-icons/pi"
import {IoIosRemoveCircleOutline} from "react-icons/io"

import {MdRemoveCircle} from "react-icons/md"

import {MdOutlineEdit} from "react-icons/md"
import {useEffect, useState} from 'react'

/*
Once the edit button is clicked, all of the following should happen:
- Edit button should turn into 'Delete / Discard / Save'
- Rider's name should turn into a text input box
- Rider's address should turn into a text input box 
- Who they want to ride with should turn into a text input box (with auto complete function someday?)
*/

function RiderRow(props){   
    //var riderName = props.riderDetails.riderID.firstName + " " + props.riderDetails.riderID.lastName
    //var riderAddress = props.riderDetails.riderID.addressLine1 + " " + props.riderDetails.riderID.addressLine2 + " "  + props.riderDetails.riderID.city + " " + props.riderDetails.riderID.zipcode

    const [localRider, setLocalRider] = useState(props.riderDetails)
    //const [riderFirstName, setRiderFirstName] = useState(props.riderDetails.firstName)
    //const [riderAddress, setRiderAddress] = useState(props.riderDetails.addressLine1 + " " + props.riderDetails.addressLine2 + " "  + props.riderDetails.riderID.city + " " + props.riderDetails.riderID.zipcode)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        riderFirstName: props.riderDetails.firstName,
        riderLastName: props.riderDetails.lastName,
        riderStreetAddress: props.riderDetails.addressLine1,
        riderCity: props.riderDetails.city,
        riderZipcode: props.riderDetails.zipcode,
        riderPreference: ""
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

    function handleSaveClickedLocal(){
        var data = {
            "firstName": formData.riderFirstName,
            "lastName": formData.riderLastName,
            "phoneNumber": "",
            "addressLine1": formData.riderStreetAddress,
            "addressLine2": "",
            "city": formData.riderCity,
            "zipcode": formData.riderZipcode,
            "state": "Wisconsin",
            "rideBuddy2": "",
            "rideBuddy3": "",
            "rideBuddy4": "",
            "longitude": "",
            "latitude": "",
            "addressChanged": false,
            "rideBuddy1": null
        }

        setEditing(false)
        const url = 'http://127.0.0.1:8000/api/rider/' + props.riderDetails.riderID;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.riders)
            setLocalRider(data.riders)
            //props.setRiderTracker((prev) => !prev)
            //props.setRiders([...props.riders, data.riders])
        })

        // Gotta pass in data to this call as well 
        props.handleSaveClick(props.riderDetails.riderID.riderID)
        //console.log(formData['riderName'])
        //console.log(formData['riderAddress'])
        //setRiderName(formData['riderName'])
        //setRiderAddress(formData['riderAddress'])
    }

    function handleDiscardClicked(){
        setEditing(false)
        // Put all form data back to their original values
        setFormData({
            riderFirstName: props.riderDetails.firstName,
            riderLastName: props.riderDetails.lastName,
            riderStreetAddress: props.riderDetails.addressLine1,
            riderCity: props.riderDetails.city,
            riderZipcode: props.riderDetails.zipcode,
            riderPreference: ""
        })
    }

    function handleDeleteClicked(){
        setEditing(false)
        props.handleRemoveClick(props.riderDetails.riderID)
    }

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
                    name="riderFirstName"
                    value={formData.riderFirstName}
                />

                <span>&nbsp;&nbsp;Last Name: </span>
                <input
                    style={{width: "25%"}}
                    type="text"
                    onChange = {handleFormChange}
                    name="riderLastName"
                    value={formData.riderLastName}
                />
                
            </span>

            <span className="rider-list-rider-address">
                <span>Street: </span>
                <input 
                    style={{width: "30%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="riderStreetAddress"
                    value={formData.riderStreetAddress}
                />
  
                <span>&nbsp;&nbsp;City: </span>
                <input 
                    style={{width: "20%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="riderCity"
                    value={formData.riderCity}
                />
                <span>&nbsp;&nbsp;ZipCode: </span>
                <input 
                    style={{width: "20%"}}
                    type="text"
                    onChange={handleFormChange}
                    name="riderZipcode"
                    value={formData.riderZipcode}
                />
            </span>

            <div className="edit-list-div">
                <span className="edit-list-buttons" onClick={()=> handleDeleteClicked()}>Delete</span>/
                <span className="edit-list-buttons" onClick={()=> handleDiscardClicked()}>Discard Changes</span>/
                <span className="edit-list-buttons" onClick={()=> handleSaveClickedLocal()}>Save</span>
            </div>
            </>:
            
            <>
            <span className="rider-list-rider-name"><input type="checkbox" className="driver-row-checkbox" value={props.riderDetails.id} onChange={props.handleCheck}/>{localRider.firstName} {props.riderDetails.lastName}</span> 
            <span className="rider-list-rider-address">{props.riderDetails.addressLine1} {props.riderDetails.addressLine2} {props.riderDetails.city}, {props.riderDetails.zipcode}</span>
            <span className="rider-list-edit-icon"><MdOutlineEdit onClick={() => {handleEditClicked()}} color="blue"/></span>
            </>
            }
            

            {props.editMode ? 
            <span className="rider-list-info-icon"><MdRemoveCircle onClick={() => {props.handleRemoveClick(props.riderDetails.riderID)}}color="red"/></span> : 
            <span className="rider-list-info-icon"><PiInfoThin onClick={() => {props.handleClick(props.riderDetails.riderID, props.index)}} /></span>
            }
            
            {props.isClicked === props.riderDetails.riderID && 
                <div className="speech-box">
                    <p className="rider-row-rider-address">
                    {props.riderDetails.addressLine1} {props.riderDetails.city}, {props.riderDetails.zipcode}
                    </p> 
                </div>
                
            }

        </>
        
    )
}

export default RiderRow