import { useState, createContext, useContext } from 'react';
import CustomPopup from 'components/CustomPopup';

const PopupContext = createContext();

export default function PopupProvider({children}){
    const [popup, setPopup] = useState({
        open: false,
        severity: "",
        message: ""
      });
    
      const handleOpenPopup = (severity, message) => {
        setPopup({
          open: true,
          severity: severity,
          message: message
        });
      };
      
      const handleClosePopup = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setPopup(oldPopup =>  ({
          ...oldPopup,
          open: false
        }));
      };

      return (
        <PopupContext.Provider value={{handleOpenPopup}}>
            {children}
            <CustomPopup handleClose={handleClosePopup} popup={popup}/>
        </PopupContext.Provider>
      )
}

const usePopup = () => useContext(PopupContext);

export {
    usePopup
}