import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import EditorPage from './components/EditorPage';
import SignIn from 'components/SignIn';
import UserRepositories from 'components/UserRepositories';
import UserReadmes from 'components/UserReadmes';
import { StyledEngineProvider } from '@mui/material/styles';
import PopupProvider from './PopupProvider';

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
          path: "signin",
          element: <SignIn />
        },
        {
          path: "repos",
          element: <UserRepositories />
        },
        {
          path: "readmes",
          element: <UserReadmes />
        },
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
  <StyledEngineProvider injectFirst>
    <PopupProvider>
        <Root />
    </PopupProvider>
  </StyledEngineProvider>
  //</React.StrictMode>
);