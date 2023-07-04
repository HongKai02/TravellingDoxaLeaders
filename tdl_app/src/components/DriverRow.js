import {PiInfoThin} from "react-icons/pi"
import {IoIosRemoveCircleOutline} from "react-icons/io"

import {MdRemoveCircle} from "react-icons/md"



function RiderRow(props){
    console.log("Rider row was rendered")
   
    return(
        <>
            {props.riderDetails.riderID.firstName} {props.riderDetails.riderID.lastName}
            {props.editMode ? 
            <span className="rider-list-info-icon"><MdRemoveCircle color="red"/></span> : 
            <span className="rider-list-info-icon"><PiInfoThin onClick={() => {props.handleClick(props.riderDetails.riderID.riderID, props.index)}} /></span>
            }
            
            {props.isClicked === props.riderDetails.riderID.riderID && 
                <div className="speech-box">
                    <p className="rider-row-rider-address">
                    {props.riderDetails.riderID.addressLine1} {props.riderDetails.riderID.addressLine2} {props.riderDetails.riderID.city}, {props.riderDetails.riderID.zipcode}
                    </p> 
                </div>
                
            }

        </>
        
    )
}

export default RiderRow