import Dashboard from "./Dashboard/Dashboard"
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import Signin from "./Pages/Signin/Signin"
import Signup from "./Pages/Signup/Signup"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
