import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import EditorPage from './components/EditorPage';
import UserContext from './UserContext'
import Signup from 'components/Signup';
import Limit from './components/Limit'

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
  
  const logout = async () => {
    const response = await fetch("http://localhost:8080/auth/logout",{
      method: "POST",
      credentials: "include",
      redirect: "manual"
    })

    console.log("LOGOUT REQUEST RETURNS: " + response.status)

    //todo fix logout, logout is not removing jsession cookie and return status 0

    if(response.ok || response.status===302){
      setUser(null);
    }
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
          path: "editor",
          element: <EditorPage />
        },
        {
          path: "signup",
          element: <Signup />
        },
        {
          path: "limit",
          element: <Limit />
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