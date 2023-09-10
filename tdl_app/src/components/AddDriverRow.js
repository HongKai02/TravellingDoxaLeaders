import {MdRemoveCircle} from "react-icons/md"
import {MdOutlineEdit} from "react-icons/md"
import {useEffect, useState} from 'react'


function AddDriverRow(props){   
    const [formData, setFormData] = useState({
        driverFirstName: "",
        driverLastName: "",
        driverStreetAddress: "",
        driverCity: "",
        driverZipcode: ""
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
                "firstName": formData.driverFirstName,
                "lastName": formData.driverLastName,
                "phoneNumber": "",
                "addressLine1": formData.driverStreetAddress,
                "addressLine2": "",
                "city": formData.driverCity,
                "zipcode": formData.driverZipcode,
                "state": "Wisconsin",
                //"preferredRider1": "",
                //"preferredRider2": "",
                //"preferredRider3": "",
                //"preferredRider4": "",
                "longitude": "",
                "latitude": "",
                "carCapacity": 4,
            }
        props.handleAddSaveClick(data)

    }

    function handleDiscardClicked(){
        props.setAddingParticipants(false)
        // Put all form data back to their original values
        setFormData({
            driverFirstName: "",
            driverLastName: "",
            driverStreetAddress: "",
            driverCity: "",
            driverZipcode: ""
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
                <span className="edit-list-buttons" onClick={()=> handleDiscardClicked()}>Discard Changes</span>/
                <span className="edit-list-buttons" onClick={()=> handleSaveClickedLocal()}>Save</span>
            </div>
            </>
        </>
        
    )
}

export default AddDriverRow