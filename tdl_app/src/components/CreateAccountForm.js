import React from "react"

function CreateAccountForm(){

    const [formData, setFormData] = React.useState({})

    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submitted!")
    }

    return(
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="field-titles">Log in details</div>
            <input
                type="text"
                placeholder="Email"
            />
            <input
                type="text"
                placeholder="Password"
            />
            <input
                type="text"
                placeholder="Confirm Password"
            />

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
            <div className="field-titles">Is there anyone you'd usually want to ride with?</div>
            <input
                type="text"
                placeholder="Enter person's name"
                
            />
            <button className="default-button">Submit</button>
        </form>
    )
}

export default CreateAccountForm