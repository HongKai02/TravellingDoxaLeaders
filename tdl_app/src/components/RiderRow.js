import {PiInfoThin} from "react-icons/pi"



function RiderRow(props){
   
    return(
        <>
            {props.riderDetails.riderID.firstName} {props.riderDetails.riderID.lastName} <span className="rider-list-info-icon"><PiInfoThin onMouseUp={() => {props.handleClick(props.riderDetails.riderID.riderID, props.index)}} /></span>

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