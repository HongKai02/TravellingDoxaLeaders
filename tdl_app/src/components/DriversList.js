import {useEffect, useState} from 'react'
import DriverRow from './DriverRow';
import {MdAddCircle} from "react-icons/md"

function DriversList(props){
    const [rowClicked, setRowClicked] = useState();
    const [editMode, setEditMode] = useState(false);
    const [checkedDrivers, setCheckedDrivers] = useState([]);


    function handleEditListClick(){
        setEditMode(true)
        setRowClicked(null)
    }

    function handleSaveChangesClick(){
        setEditMode(false)
    }

    function handleDiscardChangesClick(){
        setEditMode(false)
    }

    function handleCheck(event){

        const value = event.target.value
        const isChecked = event.target.checked

        if (isChecked){
            setCheckedDrivers([...checkedDrivers, value])
        }else {
            var filteredList = []
            // Get those in the list that is not the driver that triggered this event
            if (checkedDrivers){
                filteredList = checkedDrivers.filter((item) => item !== value)
            }
            setCheckedDrivers(filteredList)
        }


        /*
        setCheckedDrivers(prevChecked => {
            return [

            ]
        })
        */
        
    }

    var numberOfDrivers = props.drivers ? props.drivers.length : 0
    var listFull = numberOfDrivers * 40 >= Math.floor(props.height * 0.38) ? true : false


    return(
        <div>
            <div className="list-of-riders">
                <ul className={listFull ? "rider-list-full" : undefined}>
                    {props.drivers ? props.drivers.map((driver, index) => {
                        return (
                            <li key={index}>
                                <DriverRow 
                                    key = {index}
                                    driverDetails = {driver}
                                    handleClick = {1}
                                    isClicked = {rowClicked}
                                    editMode = {editMode}
                                    handleCheck = {handleCheck}
                                />
                                
                            </li>
                        )
                    }) : null}
                    {editMode ? <li className="rider-list-add-rider"><MdAddCircle color='green'/> &nbsp; Add new driver</li> : null}
                </ul>
            </div>
            <div>
                <a href="#" onClick={handleEditListClick}>Add new driver / Remove driver</a>
                <p>A total of {numberOfDrivers} people signed up, and at least {Math.ceil(numberOfDrivers/4)} car{Math.ceil(numberOfDrivers/4) >1 && 's'} will be needed</p>
                
                {editMode ? 
                <>
                    <button className="default-button" onClick={handleDiscardChangesClick}>Discard Changes</button>
                    <button className="default-button" onClick={handleSaveChangesClick}>Save Changes</button> 
                </>
                : 
                <>
                    <button className="default-button" onClick={props.onBackClick}>Back</button>
                    <button className="default-button" onClick={props.onNextClick}>Next</button>
                </>}
            </div>
            
            
        </div>
    )

}

export default DriversList