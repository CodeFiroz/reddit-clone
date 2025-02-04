import { useState } from "react"
import { Link } from "react-router-dom"


const ForgotPassword = () => {

  const [username, setUsername] = useState("");

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(username == ""){
      toast.error("Please enter emaiol address");
      return false;
    }else{
      try {
        const response = await fetch("http://localhost:4000/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username}),
            credentials: "include",
        });
    
        const data = await response.json(); // Always parse response JSON first
    
        if (!response.ok) {
            toast.error(data.message || "Error occurred");
            console.error("Error:", data);
            throw new Error(data.message || `Something went wrong ${response.status}`);
        }
    
        console.log(data.message);
        toast.success("Reset password mail has been send");
    
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
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Forgot Password</h2>
    
        <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email or Username</label>
              <input 
              name="email"
              type="text"
              value={username} 
              onChange={(e)=> setUsername(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>
    
            <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Send Password Reset Link</button>
    
           
          </div>
    
          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500">Remember the password? <Link to="/sign-in" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
    
        </>
  )
}

export default ForgotPassword
