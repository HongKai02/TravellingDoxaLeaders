import {useEffect, useState} from 'react'
import RiderRow from './RiderRow';
import {MdAddCircle} from "react-icons/md"


function RidersList(props){
    //const {height, width} = useWindowDimensions();
    const [rowClicked, setRowClicked] = useState();
    const [editMode, setEditMode] = useState(false);

    function handleInfoClick(riderID){
        // Only one info text box shou display at a time.
        setRowClicked((prevState) => 
            (prevState == riderID) ?  null : riderID
        )
    }

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

    function handleRemoveClick(riderID){
        console.log("Remove clicked " + riderID)
        const url = 'http://127.0.0.1:8000/api/riderRSVP/' + riderID;
        fetch(url, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Editing riders went wrong');
            }
            return response.json();
        })
        .then((data) => {props.setRiders(data.RSVPedRiders)})
        .catch((e) => {
            console.log(e);
        })
    }

    var numberOfRiders = props.riders ? props.riders.length : 0
    var listFull = numberOfRiders * 40 > props.height * 0.38 ? true : false

    return(
        <div>
            <div className="list-of-riders">
                <ul className={listFull ? "rider-list-full" : undefined}>
                    {props.riders ? props.riders.map((rider, index) => {
                        return (
                            <li key={index}>
                                <RiderRow 
                                    key={index}
                                    riderDetails = {rider}
                                    handleClick = {handleInfoClick}
                                    isClicked = {rowClicked}
                                    editMode = {editMode}
                                    handleRemoveClick = {handleRemoveClick}
                                />
                            </li>
                        )
                    }) : null}
                    {editMode ? <li className="rider-list-add-rider"><MdAddCircle color='green'/> &nbsp; Add participants</li> : null}
                </ul>
            </div>
            <div>
                <a href="#" onClick={handleEditListClick}>Edit List</a>
                <p>A total of {numberOfRiders} people signed up, and at least {Math.ceil(numberOfRiders/4)} car{Math.ceil(numberOfRiders/4) >1 && 's'} will be needed</p>
                {editMode ? 
                <>
                    <button className="default-button" onClick={handleDiscardChangesClick}>Discard Changes</button>
                    <button className="default-button" onClick={handleSaveChangesClick}>Save Changes</button>
                </> 
                : 
                <button className="default-button" onClick={props.onNextClick}>Next</button>}
            </div>
            
            
        </div>
    )
}

export default RidersList