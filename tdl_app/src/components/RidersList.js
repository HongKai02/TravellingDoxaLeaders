import {useEffect, useState} from 'react'
import RiderRow from './RiderRow';
import {MdAddCircle} from "react-icons/md"


function RidersList(props){
    //const {height, width} = useWindowDimensions();
    const [rowClicked, setRowClicked] = useState();
    const [editMode, setEditMode] = useState(false);
    const [checkedRiders, setCheckedRiders] = useState([]);

    function handleInfoClick(riderID){
        // Only one info text box should display at a time.
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

    function handleCheck(event){

        const value = event.target.value
        const isChecked = event.target.checked

        if (isChecked){
            setCheckedRiders([...checkedRiders, value])
        }else{
            var filteredList = []
            if (checkedRiders){
                filteredList = checkedRiders.filter((item) => item !== value)
            }
            setCheckedRiders(filteredList)
        }


    }

    var numberOfRiders = props.riders ? props.riders.length : 0
    var listFull = (numberOfRiders-1) * 40 > props.height * 0.38 ? true : false
    // Using numberOfRiders-1 because we added a 'header row'

    return(
        <div>
            <div className="list-of-riders">
                <ul className={listFull ? "rider-list-full" : undefined}>
                    <li><span className='rider-list-rider-name' style={{fontWeight: 'bold', paddingLeft: '1%'}}>Rider's Name</span><span className='rider-list-rider-address' style={{fontWeight: 'bold'}}>Rider's Address</span><span className='rider-list-rider-preference' style={{fontWeight: 'bold'}}>Who they want to ride with</span></li>
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
                                    handleCheck = {handleCheck}
                                />
                            </li>
                        )
                    }) : null}
                    {editMode ? <li className="rider-list-add-rider"><MdAddCircle color='green'/> &nbsp; Add participants</li> : null}
                </ul>
            </div>
            <div>
                <a href="#" onClick={handleEditListClick}>Edit List</a>
                <p>A total of {numberOfRiders} people selected, and at least {Math.ceil(numberOfRiders/4)} car{Math.ceil(numberOfRiders/4) >1 && 's'} will be needed</p>
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