import { useContext } from 'react'
import UserContext from './UserContext'

const useAuth = () => useContext(UserContext);

export default useAuth;