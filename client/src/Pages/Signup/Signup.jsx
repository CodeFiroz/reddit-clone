import { Link } from "react-router-dom"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [passType, setPasswordType] = useState("password");


  const [formdata, setformData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setformData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formdata.name == "" || formdata.username == "" || formdata.email == "" || formdata.password == "") {
      toast.error("Please fill the details");
      return false;
    }else if(!emailRegex.test(formdata.email)){
      toast.error("Please enter a valid email address");
      return false;
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata),
            credentials: "include",
        });
    
        const data = await response.json(); // Always parse response JSON first
    
        if (!response.ok) {
            toast.error(data.message || "Error occurred");
            console.error("Error:", data);
            throw new Error(data.message || `Something went wrong ${response.status}`);
        }
    
        console.log(data.message);
        toast.success("Signup successful");
    
    } catch (error) {
        console.error("Unexpected Error:", error);
        // toast.error(error.message || "Something went wrong!");
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
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Register</h2>

          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 md:p-8">

              <div>
                <label htmlFor="name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Full Name</label>
                <input
                  name="name"
                  id="name"
                  value={formdata.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
                <label htmlFor="username" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Username</label>
                <input
                  name="username"
                  id="username"
                  value={formdata.username}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                <input
                  name="email"
                  id="email"
                  value={formdata.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
                <input
                  name="password"
                  id="password"
                  value={formdata.password}
                  onChange={handleChange}
                  type={passType}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
          <input type="checkbox" onChange={togglePassword} id="show" className="mr-2" />
          <label htmlFor="show">
            <small>Show Password</small>
          </label>
        </div>

              <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Signup</button>


            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">Already have an account? <Link to="/sign-in" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Signup
