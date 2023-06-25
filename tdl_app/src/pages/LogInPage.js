import HomeNavbar from "../components/HomeNavbar";
import LogInForm from "../components/LogInForm";

function LogInPage(){
    return(
        <div className='log-in-page'>
            <HomeNavbar />
            <p className="page-title"> Log in to sign up for this week's family group! </p>
            <LogInForm/>
        </div>
    )
}

export default LogInPage
