import {useEffect, useState} from 'react'
import {PiInfoThin} from "react-icons/pi"

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

function RidersList(){
    const [riders, setRiders] = useState();
    const {height, width} = useWindowDimensions();

    useEffect(() => {
        console.log('Fettching...')
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
                <ul className={listFull && "rider-list-full"}>
                    {riders ? riders.map((rider) => {
                        return <li>{rider.riderID.firstName} {rider.riderID.lastName} <span className="rider-list-info-icon"><PiInfoThin /></span></li>;
                    }) : null}
                </ul>
            </div>
            <div>
                <a href="Google.com">Edit List</a>
                <p>A total of {riders && riders.length} people signed up, and at least {Math.ceil(riders.length/4)} car{Math.ceil(numberOfRiders/4) >1 && 's'} will be needed</p>
                <button className="submit-button">Log In</button>
            </div>
            
            
        </div>
    )
}

export default RidersList