import { useEffect } from "react"
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}) => {

   const {isAuthenticate, checkAuth} = useAuthStore();
  
    useEffect(()=>{
  
      checkAuth();
  
    }, [checkAuth]);

    return isAuthenticate ? children : <Navigate to="/sign-in" />;

    
}

export default ProtectRoute
