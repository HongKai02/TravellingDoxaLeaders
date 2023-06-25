import SignUpForm from "./SignUpForm"
import Event from "./Event"
import { Link } from 'react-router-dom'


function Main(){
    return(
        <div className="main">
            <Event/>
            <div className="log-in-message">
                <Link></Link>
                <p><Link to="/CreateAccount">Create an account</Link> to save your personal details.</p>
                <p><Link to="/LogInPage"> Log in</Link> if you already have an account</p>
            </div>
            <SignUpForm/>
        </div>
        
    )
}

export default Main