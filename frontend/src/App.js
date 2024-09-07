import './style.css';
import { Outlet } from 'react-router-dom'
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  return (
    <>
        <Navbar />

        <Outlet />

        <Footer />
    </>
  );
}

export default App;
