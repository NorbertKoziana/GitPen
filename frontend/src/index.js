import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import EditorPage from './components/EditorPage';
import UserContext from './UserContext'

function Root(){

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
  
  const logout = () => {
    setUser(null); 
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "editor",
          element: <EditorPage />
        }
      ]
    },
  ]);

  return(
    <UserContext.Provider value={{user, login, logout}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <Root />
  //</React.StrictMode>
);