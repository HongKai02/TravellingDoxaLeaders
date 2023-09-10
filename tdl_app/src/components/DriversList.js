import {useEffect, useState} from 'react'
import DriverRow from './DriverRow';
import {MdAddCircle} from "react-icons/md"

function HandleNextClick(){
    /*
    useEffect(() => {
        console.log("Calculating rides")
        fetch('http://127.0.0.1:8000/api/rsvpedriders/') //CHange url
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            //setRiders(data.RSVPedRiders);
        })
    }, [])
    */
   console.log("Driver pag enext clicked")
   fetch('http://127.0.0.1:8000/api/calculateRides/')
   //.then((response) => response.json())
   //.
}

function DriversList(props){
    const [checkedDrivers, setCheckedDrivers] = useState([]);
    

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
                                    handleCheck = {handleCheck}
                                />
                                
                            </li>
                        )
                    }) : null}
                    <li className="rider-list-add-rider"><MdAddCircle color='green'/> &nbsp; Add new driver</li>
                </ul>
            </div>

            <div className='rider-count-message'>
                <p style={{marginLeft: 'auto', marginRight: 'auto'}}>A total of {props.numberOfRiders} people signed up, and at least {Math.ceil(props.numberOfRiders/4)} car{Math.ceil(numberOfDrivers/4) >1 && 's'} will be needed</p>
                <button className="default-button" onClick={props.onBackClick}>Back</button>
                <button className="default-button" onClick={HandleNextClick}>Next</button>
            </div>
            
            
        </div>
    )

}

export default DriversList