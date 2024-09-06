import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import EditorPage from './components/EditorPage';

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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);