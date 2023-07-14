import avatar from "../assets/avatar.avif"
import { Link } from "react-router-dom";

// export default NavBar;
import { Search, Notifications} from '@mui/icons-material';

const NavBar = () => {
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
      <img
            className="h-14 w-14 rounded-full ml-4"
            src={avatar}
            alt="Profile"
          />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap text-sm font-[Inter] mr-4">
          Collins Mwendwa
        </div>
        <div className="whitespace-nowrap text-xs font-[Inter] text-black/40">
          Admin/Product Manager
        </div>
      </div>
      </div>
    </div>
  );
};

export default NavBar;

