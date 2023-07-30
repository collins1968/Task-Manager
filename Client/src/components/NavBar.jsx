import { Link } from "react-router-dom";
import {Context} from "../context/userContext/context"
import { useContext, useState, useEffect, useRef } from "react";
import { Search, Notifications} from '@mui/icons-material';
import ProfileCircle from "./ProfileCircle";
import axios from "axios";    
import {apiUrl} from "../utils/utils"
import {useNavigate} from "react-router-dom"

const NavBar = () => {
  const {user} = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchPanelRef = useRef(null);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const performSearch = () => {
    // Implement your API call here to fetch search results based on the searchQuery
    // For example:
    axios.get(`${apiUrl}/tasks/search/${searchQuery}`, { headers: { token: `${user.token}` } })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching tasks:", error);
      });
  };

  const handleResultClick = (taskId) => {
    // Redirect to the task page using the task ID
    navigate(`/home/${taskId}`);
  };
  const clearSearchResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        clearSearchResults();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-[#ededed] flex flex-row justify-between gap-5 w-screen md:w-auto items-center px-8 py-2 relative">
      <div className="bg-[#e5e5e5] flex flex-row justify-between w-1/2 h-12 items-center px-4 rounded-lg">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          // onBlur={clearSearchResults}
          className="text-sm font-[Inter] flex-grow resize-none outline-none bg-transparent"
        />
        <Search
          className="h-6 w-6 text-gray-500 cursor-pointer"
          onClick={performSearch}
        />
      </div>
      <div className="flex items-center gap-5">
        {/* <Notifications className="h-10 w-10 text-gray-500" /> */}
        <Link to="/home/profile">
          <ProfileCircle firstName={user.first_name} lastName={user.last_name} />
        </Link>
        <div className="flex flex-col gap-2">
          <div className="whitespace-nowrap text-sm font-[Inter] mr-4">
            {user.first_name} {user.last_name}
          </div>
          <div className="whitespace-nowrap text-xs font-[Inter] text-black/40">
            {user.role}
          </div>
        </div>
      </div>
      {/* Display search results */}
      <div 
      ref={searchPanelRef}
      className="absolute top-[5px] right-[300px] w-72 bg-white shadow-lg rounded-lg py-4 px-6 z-10">
        {searchResults.length === 0 ? (
          <div className="text-gray-500">No results found.</div>
        ) : 
        (
          searchResults.map((task) => (
            <div
              key={task.task_id}
              className="my-2 cursor-pointer"
              onClick={() => handleResultClick(task.task_id)}
            >
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NavBar;

