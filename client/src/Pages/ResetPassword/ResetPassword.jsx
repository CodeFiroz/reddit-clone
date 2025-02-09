import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from "react-router-dom";

const ResetPassword = () => {

  const {token} = useParams();

    const [passType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
  
    const togglePassword = ()=>{
      if(passType == "password"){
        setPasswordType("text");
      }else{
        setPasswordType("password");
      }
    }

    const handleSubmit = async (e)=>{

      e.preventDefault();


    if (password == "") {
      toast.error("Please Create a new password");
      return false;
    }else {
      try {
        const response = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password}),
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


    

  return (
    <>

<Toaster />

    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Reset Password </h2>
    
        <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">New Password</label>
              <input 
                name="password"
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type={passType}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>
            <div>
          <input type="checkbox" onChange={togglePassword} id="show" className="mr-2" />
          <label htmlFor="show">
            <small>Show Password</small>
          </label>
        </div>

    
            <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Change Password</button>
    
           
          </div>
    
        </form>
      </div>
    </div>
    
        </>
  )
}

export default ResetPassword
