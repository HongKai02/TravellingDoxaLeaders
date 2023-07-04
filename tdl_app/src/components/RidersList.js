import {useEffect, useState} from 'react'
import RiderRow from './RiderRow';
import {MdAddCircle} from "react-icons/md"
import { useNavigate } from 'react-router-dom';




function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}


  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}



function RidersList(props){
    const [riders, setRiders] = useState();
    const {height, width} = useWindowDimensions();
    const [rowClicked, setRowClicked] = useState();
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    function handleInfoClick(riderID){
        // If previous one clicked is the same one, then set row clicked to null so it closes it

        // If previous one clicked is null, then set row clicked to whichever element triggerred this event

        // If previous one clicked was a different one, then set row clicked to whichever element triggered this event

        /*
        setRowClicked((prevState) => {
            if (prevState == riderID) return null
            else return riderID
        })
        */

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

    // This function is likely not needed, it's left in place in case we were to go with the routing route
    function handleNextClick(){
        navigate("/ChooseDrivers")
    }

    useEffect(() => {
        console.log("Fetching data...")
        fetch('http://127.0.0.1:8000/api/rsvpedriders/')
        .then((response) => response.json())
        .then((data) => {
            setRiders(data.RSVPedRiders);
        })
    }, []) // The empty list here is to specify that this effect should only run once, on load

    var numberOfRiders = riders ? riders.length : 0
    var listFull = numberOfRiders * 38 > height * 0.38 ? true : false

    return(
        <div>
            <div className="list-of-riders">
                <ul className={listFull ? "rider-list-full" : undefined}>
                    {riders ? riders.map((rider, index) => {
                        return (
                            <li key={index}>
                                <RiderRow 
                                    key={index}
                                    riderDetails = {rider}
                                    handleClick = {handleInfoClick}
                                    isClicked = {rowClicked}
                                    editMode = {editMode}
                                    
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
                {editMode ? <button className="default-button" onClick={handleSaveChangesClick}>Save Changes</button> : <button className="default-button" onClick={props.onNextClick}>Next</button>}
            </div>
            
            
        </div>
    )
}

export default RidersList