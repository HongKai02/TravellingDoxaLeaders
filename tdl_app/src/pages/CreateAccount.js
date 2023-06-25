import HomeNavbar from "../components/HomeNavbar";
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount(){
    return(
        <div className='create-account-page'>
            <HomeNavbar/>
            <h2>Create an account</h2>
            <CreateAccountForm />
        </div>
    )
}

export default CreateAccount