import './style.css';
import { Outlet, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserContext from './UserContext'


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("http://localhost:8080/user/info",{
        method: "GET",
        credentials: "include",
        redirect: "manual"
      });
      if(response.ok){
        const newUser = await response.json();
        setUser(newUser);
      }
    }
    fetchUserInfo();
  }
  , []);

  const login = (user) => {
    setUser(user)
  }

  const navigate = useNavigate();
  
  const logout = async () => {
    const response = await fetch("http://localhost:8080/auth/logout",{
      method: "POST",
      credentials: "include",
    })

    if(response.ok){
      setUser(null);
      navigate("/");
    }
  }

  return (
    <UserContext.Provider value={{user, login, logout}}>
        <Navbar />

        <Outlet />

        <Footer />
      </UserContext.Provider>
  );
}

export default App;
