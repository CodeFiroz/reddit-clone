import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import Dashboard from "./Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import NewPost from "./Pages/NewPost/NewPost";
import Profile from "./Pages/Profile/Profile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import {checkAuth} from "./store/authService.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  const dispatch = useDispatch();
  
      useEffect(() => {
          const fetchAuth = async () => {
            const user = await checkAuth();
            if (user) {
              dispatch(login(user)); 
            } else {
              dispatch(logout());
            }
          };
      
          fetchAuth();
        }, [dispatch]);

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
