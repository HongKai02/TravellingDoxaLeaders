import {PiInfoThin} from "react-icons/pi"
import {IoIosRemoveCircleOutline} from "react-icons/io"

import {MdRemoveCircle} from "react-icons/md"



function DriverRow(props){   
    return(
        <>
            <input type="checkbox" className="driver-row-checkbox" value={props.driverDetails.id} onChange={props.handleCheck}/>
            {props.driverDetails.firstName} {props.driverDetails.lastName}
            {props.editMode ? 
            <span className="rider-list-info-icon"><MdRemoveCircle color="red"/></span> : 
            <div className="rider-list-info-icon">
                <a href="#" className="add-reduce">+</a>
                <span className="car-capacity">{props.driverDetails.carCapacity}</span>
                <a href="#" className="add-reduce">-</a>
            </div>
            }


        </>
        
    )
}

export default DriverRow