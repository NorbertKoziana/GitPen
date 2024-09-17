import {useState, useEffect, createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "PopupProvider";

const UserContext = createContext();

export default function UserProvider({children}){

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const login = (user) => {
        setUser(user)
    }

    const {handleOpenPopup} = usePopup();

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