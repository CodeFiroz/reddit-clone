import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import Dashboard from "./Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import NewPost from "./Pages/NewPost/NewPost";
import Profile from "./Pages/Profile/Profile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


function App() {

  const {authUser, isAuthenticate, loading, checkAuth} = useAuthStore();

  useEffect(()=>{

    checkAuth();

  }, [checkAuth]);

  console.log(authUser);
  console.log(isAuthenticate);

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
