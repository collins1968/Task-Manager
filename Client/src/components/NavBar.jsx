import avatar from "../assets/avatar.avif"
import { Link } from "react-router-dom";
import {Context} from "../context/userContext/context"
import { useContext } from "react";
import { Search, Notifications} from '@mui/icons-material';
import ProfileCircle from "./ProfileCircle";

const NavBar = () => {
  const {user} = useContext(Context)
  return (
    <div className="bg-[#ededed] flex flex-row justify-between gap-5 w-screen md:w-auto items-center px-8 py-2">
      <div className="bg-[#e5e5e5] flex flex-row justify-between w-1/2 h-12 items-center px-4 rounded-lg">
        <input
          type="text"
          placeholder="Search"
          className="text-sm font-[Inter] flex-grow resize-none outline-none bg-transparent"
        />
        <Search className="h-6 w-6 text-gray-500" />
      </div>
      <div className='flex items-center gap-5'>
      <Notifications className="h-10 w-10 text-gray-500" />
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
    </div>
  );
};

export default NavBar;

