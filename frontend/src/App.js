import './style.css';
import { Outlet } from 'react-router-dom'
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProvider from 'UserProvider';

function App() {

  return (
    <UserProvider>
      <Navbar />

      <Outlet />

      <Footer />
    </UserProvider>
  );
}

export default App;
