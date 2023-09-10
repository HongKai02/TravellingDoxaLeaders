import {useEffect, useState} from 'react'
import RiderRow from './RiderRow';
import AddRiderRow from './AddRiderRow';
import {MdAddCircle} from "react-icons/md"


function RidersList(props){
    //const {height, width} = useWindowDimensions();
    const [rowClicked, setRowClicked] = useState();
    const [checkedRiders, setCheckedRiders] = useState([]);
    const [addingParticipants, setAddingParticipants] = useState(false);

    function handleRemoveClick(riderID){
        console.log("Remove clicked " + riderID)
        const url = 'http://127.0.0.1:8000/api/rider/' + riderID;
        fetch(url, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Editing riders went wrong');
            }
            return response.json();
        })
        .then((data) => {props.setRiders(data.riders)})
        .catch((e) => {
            console.log(e);
        })
    }

    function handleAddSaveClick(data){
        console.log("Adding rider:")
        console.log(data)
        const url = 'http://127.0.0.1:8000/api/riders/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Adding riders went wrong');
            }
            return response.json();
        }) 
        .then((data) => {
            // Assume add was successful 
            props.setRiders([...props.riders, data.riders])
            setAddingParticipants(false)
        })
        .catch((e)=> {
            console.log(e);
        })
    }

    function handleAddRiderClick(){
        setAddingParticipants(true)
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
    console.log(checkedRiders)
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
                                    handleRemoveClick = {handleRemoveClick}
                                    handleCheck = {handleCheck}
                                    riders = {props.riders}
                                    setRiders = {props.setRiders}
                                />
                            </li>
                        )
                    }) : null}
                    {addingParticipants? 
                    <li>
                        <AddRiderRow 
                            handleRemoveClick = {handleRemoveClick}
                            handleAddSaveClick = {handleAddSaveClick}
                            handleCheck = {handleCheck}
                            setAddingParticipants= {() => setAddingParticipants()}
                        />
                    </li>
                    :
                    undefined}
                    <li className="rider-list-add-rider"><MdAddCircle onClick={handleAddRiderClick}color='green'/> &nbsp; Add participants</li>
                </ul>
            </div>
            <div className='rider-count-message'>
                <p style={{marginLeft: 'auto', marginRight: 'auto'}}>A total of {numberOfRiders} people selected, and at least {Math.ceil(numberOfRiders/4)} car{Math.ceil(numberOfRiders/4) >1 && 's'} will be needed.</p>

                <button className="default-button" onClick={props.onNextClick}>Next</button>
            </div>
            
            
        </div>
    )
}

export default RidersList