import {useEffect, useState} from 'react'

function RidersList(){
    const [riders, setRiders] = useState();

    useEffect(() => {
        console.log('Fettching...')
        fetch('http://127.0.0.1:8000/api/rider/')
        .then((response) => response.json())
        .then((data) => {
            setRiders(data.riders);
        })
    }, []) // The empty list here is to specify that this effect should only run once, on load

    return(
        <div>
            <div className="list-of-riders">
                <ul>
                    {riders ? riders.map((rider) => {
                        return <li>{rider.firstName} {rider.lastName} <span className="rider-list-info-icon"> i </span></li>;
                    }) : null}
                </ul>
            </div>
            <div>
                <a href="Google.com">Edit List</a>
                <p>A total of {riders.length} people signed up, and at least {Math.ceil(riders.length/4)} cars will be needed</p>
                <button className="submit-button">Log In</button>
            </div>
            
        </div>
    )
}

export default RidersList