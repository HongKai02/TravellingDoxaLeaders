import React from "react"

function SignUpForm(){

    const [formData, setFormData] = React.useState({})

    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submitted!")
    }

    return(
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <h3>Family Group Interest Form</h3>
            <div className="field-titles">Personal Information</div>
            <input
                type="text"
                placeholder="First Name"
            />

            <input
                type="text"
                placeholder="Last Name"
                
            />

            <input
                type="text"
                placeholder="Phone Number"
                
            />

            <div className="field-titles">Address</div>
            <input
                type="text"
                placeholder="Address Line 1"
                
            />
            <input
                type="text"
                placeholder="Address Line (Optional) 2"
                
            />
            <input
                type="text"
                placeholder="City"
                
            />
            <input
                type="text"
                placeholder="Zipcode"
                
            />
            <input
                type="text"
                placeholder="State"
                
            />
            <div className="field-titles">Is there anyone you'd like to ride with?</div>
            <input
                type="text"
                placeholder="Enter person's name"
                
            />
            <button className="submit-button">Submit</button>
        </form>
    )
}

export default SignUpForm