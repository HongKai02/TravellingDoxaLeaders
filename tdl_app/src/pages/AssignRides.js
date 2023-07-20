import HomeNavbar from "../components/HomeNavbar"
import RidersList from "../components/RidersList"
import {useEffect, useState} from 'react'
import DriversList from "../components/DriversList"

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

function AssignRides(){
    const [riderPage, setRiderPage] = useState(true)
    const [riders, setRiders] = useState()
    const [drivers, setDrivers] = useState()
    const {height, width} = useWindowDimensions()
    
    // Get list of riders
    useEffect(() => {
        console.log("Fetching data...")
        fetch('http://127.0.0.1:8000/api/rsvpedriders/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setRiders(data.RSVPedRiders);
        })
    }, []) // The empty list here is to specify that this effect should only run once, on load

    // Get list of drivers
    useEffect(() => {
        console.log("Fecthinc driver data...")
        fetch('http://127.0.0.1:8000/api/driver/')
        .then((response) => response.json())
        .then((data) => {
            setDrivers(data.drivers);
        })
    }, [])

    var numberOfRiders = riders ? riders.length : 0

    function handleNextClick(){
        setRiderPage(false)
    }

    function handleBackClick(){
        setRiderPage(true)
    }

    // Set if the rider list page or driver list page should be displayed
    var content = riderPage ? 
    <>
        <p className="page-title"> Here are the people who signed up for this week's family group </p>
        <RidersList 
            onNextClick={handleNextClick}
            riders = {riders}
            height={height}
            setRiders = {setRiders}
        />
    </> 
    :
    <>
        <p className="page-title"> Who will be driving this week and how many people can they pickup? At least {Math.ceil(numberOfRiders/4)} driver{Math.ceil(numberOfRiders/4) >1 && 's'} needed </p>
        <DriversList 
            onBackClick={handleBackClick}
            drivers = {drivers}
            height = {height}
            numberOfRiders = {riders ? riders.length : 0}
        />
    </>

    return(
        
        <div>
            <HomeNavbar />
            {content}
        </div>
    )
}

export default AssignRides