import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import EditorPage from './components/EditorPage';
import Signup from 'components/Signup';
import Limit from './components/Limit'

function Root(){

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
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <Root />
  //</React.StrictMode>
);