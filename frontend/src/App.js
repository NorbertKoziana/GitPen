import './style.css';
import { Outlet } from 'react-router-dom'
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserContext from './UserContext'

function App() {

  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null); 
  }

  return (
    <>
      <UserContext.Provider value={{user, login, logout}}>
        <Navbar />

        <Outlet />

        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
