import HomeNavbar from "../components/HomeNavbar"
import RidersList from "../components/RidersList"


function AssignRides(){
    return(
        <div>
            <HomeNavbar />
            <p className="page-title"> Here are the people who signed up for this week's family group </p>
            <RidersList />
        </div>
    )
}

export default AssignRides