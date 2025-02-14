import Header from "../../Components/Header/Header"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";

const Post = () => {

    const {postid} = useParams();
    const [postInfo, setPostInfo] = useState({});

    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                const response = await fetch(`http://localhost:4000/api/post/${postid}`, {
                    method: "POST",
                    credentials: "include",
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    toast.error(data.message || "Error occurred");
                    console.error("Error:", data);
                    throw new Error(data.message || `Something went wrong ${response.status}`);
                }
    
    
                setPostInfo(data.post);
    
            } catch (error) {
                console.error("Unexpected Error:", error);
                toast.error("Internal Server Error");
            }
        }

        fetchPost();
    }, [postid]);

    console.log(postInfo);

  return (
    <>
    <Header/>
    <Toaster />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-md px-4 md:px-8">
    <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
        {postInfo.title}
    </h1>

    <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
      {postInfo.description}
    </p>

   

    <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
      <img src={postInfo.image} loading="lazy" alt="Photo by Minh Pham" className="h-full w-full object-cover object-center" />
    </div>

    <h2 className="mb-4 font-bold text-gray-800 sm:text-xl md:mb-6">
        Leave A Comment
    </h2>

    
    <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
    
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Message*</label>
        <textarea name="message" className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
      </div>

      <div className="flex items-center justify-between sm:col-span-2">
        <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Post comment</button>
</div>

      
    </form>
    
   
  </div>
</div>

<div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-md px-4 md:px-8">
    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">Customer Reviews</h2>


    <div className="divide-y">
   
      
      <div className="flex flex-col gap-3 py-4 md:py-8">
        <div>
          <span className="block text-sm font-bold">Kate Berg</span>
          <span className="block text-sm text-gray-500">July 21, 2021</span>
        </div>
     

        <p className="text-gray-600">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.</p>
      </div>
      

    
    </div>
  </div>
</div>
    </>
  )
}

export default Post
