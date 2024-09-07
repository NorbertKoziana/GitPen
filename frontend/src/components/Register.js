import React, { useState } from 'react'
import '../style.css';
import { useNavigate } from 'react-router-dom'

function Register(){

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        const response = await fetch("http://localhost:8080/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if(response.ok){
            navigate("/login");
        }else{
            console.log("Something went wrong") //display pop up instead of console log later on
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
        <div className='register'>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input name='firstName' 
                        value={formData.firstName} 
                        onChange={(event) => handleFormChange(event)}  
                    />
                </label>
                <label>
                    Last Name:
                    <input name='lastName' 
                        value={formData.lastName} 
                        onChange={(event) => handleFormChange(event)}  
                    />
                </label>
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

export default Register;