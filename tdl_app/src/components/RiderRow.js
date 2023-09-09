import {PiInfoThin} from "react-icons/pi"
import {IoIosRemoveCircleOutline} from "react-icons/io"

import {MdRemoveCircle} from "react-icons/md"



function RiderRow(props){   
    return(
        <>
            
            <span className="rider-list-rider-name"><input type="checkbox" className="driver-row-checkbox" value={props.riderDetails.id} onChange={props.handleCheck}/>{props.riderDetails.riderID.firstName} {props.riderDetails.riderID.lastName}</span> 
            <span className="rider-list-rider-address">{props.riderDetails.riderID.addressLine1} {props.riderDetails.riderID.addressLine2} {props.riderDetails.riderID.city}, {props.riderDetails.riderID.zipcode}</span>
            {props.editMode ? 
            <span className="rider-list-info-icon"><MdRemoveCircle onClick={() => {props.handleRemoveClick(props.riderDetails.riderID.riderID)}}color="red"/></span> : 
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