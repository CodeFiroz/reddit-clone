import { useState, useEffect } from 'react'
import Card from '../Components/Card/Card'
import Header from '../Components/Header/Header'
import toast, {Toaster} from "react-hot-toast"

const Dashboard = () => {

    const [posts, setPost] = useState([]);

    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                const response = await fetch("http://localhost:4000/api/post/posts", {
                    method: "POST",
                    credentials: "include",
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    toast.error(data.message || "Error occurred");
                    console.error("Error:", data);
                    throw new Error(data.message || `Something went wrong ${response.status}`);
                }
    
    
                setPost(data.posts);
    
            } catch (error) {
                console.error("Unexpected Error:", error);
                toast.error("Internal Server Error");
            }
        }

        fetchPost();
    }, []);

    console.log(posts);
    



    return (
        <>
    <Toaster/>
        <Header />

            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">


                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">

                {posts.map((post)=>(
                    <Card 
                        key={post._id} 
                        id={post._id} 
                        image={post.image} 
                        title={post.title} 
                        description={post.description} 
                        postTime={post.createdAt}
                        userName={post.userId.name}
                    />
                    
                ))}


                </div>


                </div>
            </div>

        </>
    )
}

export default Dashboard
