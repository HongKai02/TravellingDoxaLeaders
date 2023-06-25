import React from "react"
import { Link } from 'react-router-dom'

function LogInForm(){

    const [formData, setFormData] = React.useState({})

    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submitted!")
    }

    return(
        <form className="log-in-form" onSubmit={handleSubmit}>
            <h3>Log In Form</h3>
            <input
                type="text"
                placeholder="Email Address"
            />
            <input
                type="text"
                placeholder="Password"
                
            />
            <div className='log-in-page-links'>
                <p><Link to="/ForgotPassword"> Forgot password ? </Link></p>
                <p>No account? <Link to="/CreateAccount">Create one now!</Link></p>
            </div>
            <button className="submit-button">Log In</button>
        </form>
    )
}

export default LogInForm