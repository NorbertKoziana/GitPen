import {useState, useEffect, createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "PopupProvider";
import axios from 'axios';

const UserContext = createContext();

export default function UserProvider({children}){

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const login = (user) => {
        setUser(user)
    }

    const {handleOpenPopup} = usePopup();

    const logout = async () => {
      try{
        const response = await axios.post(
          "http://localhost:8080/auth/logout",
          null,
          {
            withCredentials: true,
            withXSRFToken: true
        });

        setUser(null);
        navigate("/");
      }catch(error){
        handleOpenPopup("error", "Could not log you out, try again.")
      }
    }

    useEffect(() => {
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if(error.status === 401){
          logout()
        }
        return Promise.reject(error);
      });
    }, [])

    useEffect(() => {
        const fetchUserInfo = async () => {
          try{
            const response = await fetch("http://localhost:8080/user/info",{
              method: "GET",
              credentials: "include",
              redirect: "manual"
            });
            if(response.ok){
              const newUser = await response.json();
              login(newUser);
            }
          }catch(error){
            handleOpenPopup("error", error.message)
          }
    
        }
        fetchUserInfo();
      }
      , []);

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

const useAuth = () => useContext(UserContext);

export {
    useAuth
}