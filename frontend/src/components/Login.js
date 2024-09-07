import React, {useState} from 'react'
import '../style.css';
import useAuth from '../UseAuth';
import { useNavigate } from 'react-router-dom'

function Login(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(event){

        event.preventDefault();

        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData)
        });

        if(response.ok){
            fetch("http://localhost:8080/user/info", {
                method: "GET",
                credentials: "include"
            }).then( res => login(res.json()) )

            navigate("/editor")
        }else{
            console.log(response.status)
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
                    Email:
                    <input name='email' 
                        value={formData.email} 
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