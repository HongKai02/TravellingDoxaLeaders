import HomeNavbar from "../components/HomeNavbar"
import RidersList from "../components/RidersList"
import {useEffect, useState} from 'react'
import DriversList from "../components/DriversList"



function AssignRides(){
    const [riderPage, setRiderPage] = useState(true)

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
        />
    </> 
    :
    <>
        <p className="page-title"> Who will be driving this week? At least x drivers needed </p>
        <DriversList />
    </>


    return(
        
        <div>
            <HomeNavbar />
            {content}
                
            
        </div>
    )
}

export default AssignRides