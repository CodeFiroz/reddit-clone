import Header from "../../Components/Header/Header";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NewPost = () => {

  const [formdata, setFormdata] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formdata.title == "" || formdata.image == "" || formdata.description == "") {
      toast.error("Please fill the details");
      return false;
    } else {
      try {

        const response = await fetch("http://localhost:4000/api/post/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Error occurred");
          console.error("Error:", data);
          toast.error(data.message || `Something went wrong ${response.status}`);
          throw new Error(data.message || `Something went wrong ${response.status}`);
        }

        toast.success(data.message);

        setFormdata({
          title: "",
          image: "",
          description: "",
        })

      } catch (err) {
        toast.error("Internal Server Error");
        console.log(err);
      }
    }

  }

  return (
    <>

      <Header />

      <Toaster />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">New Post</h2>

          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 md:p-8">

              {/* <div>
          <label htmlFor="pic">Upload File</label>
          <input 
          name="pic"
          type="file"
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div> */}


              <div>

                <input
                  name="image"
                  type="text"
                  placeholder="Image url"
                  value={formdata.image}
                  onChange={handleChange}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>

                <input
                  name="title"
                  type="text"
                  value={formdata.title}
                  onChange={handleChange}
                  placeholder="What's Happening"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>

                <textarea
                  name="description"
                  value={formdata.description}
                  onChange={handleChange}
                  placeholder="Details"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
              </div>



              <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Post Now</button>




            </div>


          </form>
        </div>
      </div>


      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">

        <div className="relative flex flex-wrap bg-indigo-500 px-4 py-3 sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:px-8">
          <div className="order-1 mb-2 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:mb-0 sm:w-auto md:text-base">Create & Share Post with Everyone</div>

          <a href="#" className="order-last inline-block w-full whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 sm:order-none sm:w-auto md:text-sm">Learn more</a>


          <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-1 sm:w-auto xl:mr-3">
            <button type="button" className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>

      </div>

    </>
  )
}

export default NewPost