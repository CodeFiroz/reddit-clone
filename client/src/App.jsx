import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import Dashboard from "./Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Logout from "./Pages/Logout/Logout";
import NewPost from "./Pages/NewPost/NewPost";
import Post from "./Pages/Post/Post";
import Profile from "./Pages/Profile/Profile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

 
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        <Route path="/new" element={<ProtectRoute><NewPost /></ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute><Profile /></ProtectRoute>} />
        <Route path="/post/:postid" element={<ProtectRoute><Post /></ProtectRoute>} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
