import {useEffect, useState} from 'react'
import {PiInfoThin} from "react-icons/pi"

function RidersList(){
    const [riders, setRiders] = useState();

    useEffect(() => {
        console.log('Fettching...')
        fetch('http://127.0.0.1:8000/api/rsvpedriders/')
        .then((response) => response.json())
        .then((data) => {
            setRiders(data.RSVPedRiders);
        })
    }, []) // The empty list here is to specify that this effect should only run once, on load

    return(
        <div>
            <div className="list-of-riders">
                <ul>
                    {riders ? riders.map((rider) => {
                        console.log(rider)
                        return <li>{rider.riderID.firstName} {rider.riderID.lastName} <span className="rider-list-info-icon"><PiInfoThin /></span></li>;
                    }) : null}
                </ul>
            </div>
            <div>
                <a href="Google.com">Edit List</a>
                <p>A total of {riders && riders.length} people signed up, and at least {riders && Math.ceil(riders.length/4)} cars will be needed</p>
                <button className="submit-button">Log In</button>
            </div>
            
            
        </div>
    )
}

export default RidersList