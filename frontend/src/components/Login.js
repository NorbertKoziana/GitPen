import React, {useState} from 'react'
import '../style.css';
import useAuth from '../UseAuth';
import { useNavigate } from 'react-router-dom'

function Login(){

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });
    
            if(response.ok){
                login(true);//can set user details returned from api
                navigate("/editor")
            }else{
                console.log("smth went wrong")
            }
        }catch(error){
            console.log("Error:", error);
        }

    }

    function handleFormChange(event){
        setFormData((oldForm) => {
            const {name, value} = event.target;
            return {
                ...oldForm,
                [name]: value
            }
        })
    }

    return (
        <div className='login'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Login/Email:
                    <input name='login' 
                        value={formData.login} 
                        onChange={(event) => handleFormChange(event)}  
                    />
                </label>
                <label>
                    Password:
                    <input name='password' 
                        value={formData.password} 
                        onChange={(event) => handleFormChange(event)}  
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;