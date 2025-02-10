import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();
  const {isAuthenticate, checkAuth, login} = useAuthStore();

  useEffect(()=>{
  
    checkAuth();

  }, [checkAuth]);

  if(isAuthenticate){
    return <Navigate to="/" />;
  }



  const [passType, setPasswordType] = useState("password");

  const [formdata, setformData] = useState({
    username: "",
    password: ""
  });

  const handleChange =(e)=>{
    setformData({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(formdata.email == "" || formdata.password == ""){
      toast.error("Please fill the details");
      return false;
    }else{
      try {
        const response = await fetch("http://localhost:4000/api/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
            credentials: "include",
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            toast.error(data.message || "Error occurred");
            console.error("Error:", data);
            throw new Error(data.message || `Something went wrong ${response.status}`);
        }
    
        if (data?.user) {
            toast.success("Login successful");
            console.log("User data received:", data.user);

            login(data.user);
            
            navigate("/");
            
        } else {
            console.error("User data is missing in response:", data);
        }
    } catch (error) {
        console.error("Unexpected Error:", error);
        toast.error("Internal Server Error");
    }
    
    }

  }

  const togglePassword = ()=>{
    if(passType == "password"){
      setPasswordType("text");
    }else{
      setPasswordType("password");
    }
  }

  return (
    <>
<Toaster />
<div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

    <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div>
          <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email Or Username</label>
          <input 
          name="username" 
          id="username"
          value={formdata.username}
          onChange={handleChange}
          type="text"
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
           />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
          <input 
          name="password" 
          id="password"
          onChange={handleChange}
          value={formdata.password}
          type={passType}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div>
          <input type="checkbox" onChange={togglePassword} id="show" className="mr-2" />
          <label htmlFor="show">
            <small>Show Password</small>
          </label>
        </div>

        <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Log in</button>

        <div className="relative flex items-center justify-center">
          <span className="absolute inset-x-0 h-px bg-gray-300"></span>
          <span className="relative bg-white px-4 text-sm text-gray-400">Log in with social</span>
        </div>

   
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-4">
        <p className="text-center text-sm text-gray-500"> <Link to="/forgot-password" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Forgot Your Password</Link></p>
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">Do not have an account? <Link to="/sign-up" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</Link></p>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default Signin
