import {useEffect, useState} from 'react'
import RiderRow from './RiderRow';
import {MdAddCircle} from "react-icons/md"

/*
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
*/

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
        console.log("Remove clicked" + riderID)
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