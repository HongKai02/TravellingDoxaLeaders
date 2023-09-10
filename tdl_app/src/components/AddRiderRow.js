import {MdRemoveCircle} from "react-icons/md"
import {MdOutlineEdit} from "react-icons/md"
import {useEffect, useState} from 'react'


function AddRiderRow(props){   
    //var riderName = props.riderDetails.riderID.firstName + " " + props.riderDetails.riderID.lastName
    //var riderAddress = props.riderDetails.riderID.addressLine1 + " " + props.riderDetails.riderID.addressLine2 + " "  + props.riderDetails.riderID.city + " " + props.riderDetails.riderID.zipcode

    //const [riderName, setRiderName] = useState(props.riderDetails.firstName + " " + props.riderDetails.lastName)
    //const [riderAddress, setRiderAddress] = useState(props.riderDetails.addressLine1 + " " + props.riderDetails.addressLine2 + " "  + props.riderDetails.riderID.city + " " + props.riderDetails.riderID.zipcode)
    const [formData, setFormData] = useState({
        riderFirstName: "",
        riderLastName: "",
        riderStreetAddress: "",
        riderCity: "",
        riderZipcode: "",
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
        props.handleAddSaveClick(data)
        // Gotta pass in data to this call as well 
        //console.log(formData['riderName'])
        //console.log(formData['riderAddress'])
        //setRiderName(formData['riderName'])
        //setRiderAddress(formData['riderAddress'])
    }

    function handleDiscardClicked(){
        props.setAddingParticipants(false)
        // Put all form data back to their original values
        setFormData({
            riderFirstName: "",
            riderLastName: "",
            riderStreetAddress: "",
            riderCity: "",
            riderZipcode: "",
            riderPreference: ""
        })
    }

    return(
        <>
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
                <span className="edit-list-buttons" onClick={()=> handleDiscardClicked()}>Discard Changes</span>/
                <span className="edit-list-buttons" onClick={()=> handleSaveClickedLocal()}>Save</span>
            </div>
            </>
        </>
        
    )
}

export default AddRiderRow