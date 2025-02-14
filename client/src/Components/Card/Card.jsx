import { Link } from "react-router-dom";

const Card = (props) => {
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (let unit in intervals) {
        const count = Math.floor(seconds / intervals[unit]);
        if (count > 0) {
            return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}


  return (    
    <>
          
      <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
          <img src={props.image} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            <Link to={'/post/' + props.id} className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{props.title}</Link>
          </h2>

          <p className="mb-8 text-gray-500">{props.description}</p>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <img src="https://images.unsplash.com/photo-1611898872015-0571a9e38375?auto=format&q=75&fit=crop&w=64" loading="lazy" alt="Photo by Brock Wegner" className="h-full w-full object-cover object-center" />
              </div>

              <div>
                <span className="block text-indigo-500">{props.userName}</span>
                <span className="block text-sm text-gray-400">{timeAgo(props.postTime)}</span>
              </div>
            </div>

            <span className="rounded border px-2 py-1 text-sm text-gray-500">Article</span>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Card
