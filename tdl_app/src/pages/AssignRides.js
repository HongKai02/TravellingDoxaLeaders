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
    const [numberOfSelectedRiders, setNumberOfSelectedRiders] = useState(0)
    
    // Get list of riders
    useEffect(() => {
        console.log("Fetching rider data...")
        fetch('http://127.0.0.1:8000/api/riders/')
        .then((response) => response.json())
        .then((data) => {
            setRiders(data.riders);
        })
    }, []) // The empty list here is to specify that this effect should only run once, on load

    // Get list of drivers
    useEffect(() => {
        console.log("Fetching driver data...")
        fetch('http://127.0.0.1:8000/api/drivers/')
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
        <p className="page-title"> Select who will be attending family group this week </p>
        <RidersList 
            onNextClick={handleNextClick}
            riders = {riders}
            height = {height}
            setRiders = {setRiders}
            setNumberOfSelectedRiders = {setNumberOfSelectedRiders}
            numberOfSelectedRiders = {numberOfSelectedRiders}
        />
    </> 
    :
    <>
        <p className="page-title"> Who will be driving this week? At least {Math.ceil(numberOfSelectedRiders/4)} driver{Math.ceil(numberOfSelectedRiders/4) >1 && 's'} needed </p>
        <DriversList 
            onBackClick={handleBackClick}
            drivers = {drivers}
            setDrivers = {setDrivers}
            height = {height}
            numberOfRiders = {riders ? riders.length : 0}
            numberOfSelectedRiders = {numberOfSelectedRiders}
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