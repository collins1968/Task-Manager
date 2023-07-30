import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StatusChange from "./StatusChange";
import { useState, useContext } from 'react';
import { Context } from "../context/userContext/context";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllTaskSingle = ({task_id, title, description, priority, due_date, status }) => {
  const { user } = useContext(Context);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const handleStatusDropdownToggle = () => {
    // Toggle the status dropdown visibility
    setIsStatusDropdownOpen((prevState) => !prevState);
  };
  return (
    <div className="border-solid border-[#bdbdbd] flex flex-col gap-3 h-[211px] max-w-[250px] items-start mb-4 px-4 py-2 border rounded bg-white shadow-md transition-shadow hover:shadow-lg">
    <div className="self-stretch flex flex-row justify-between items-center mb-2 ml-1 mr-2">
      <div className="text-xs font-semibold text-gray-700 w-[150px] shrink-0 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </div>
        <div className="relative">
          <MoreHorizIcon
            onClick={handleStatusDropdownToggle}
            className="min-h-0 min-w-0 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-800"
            alt="User"
          />
          {isStatusDropdownOpen && (
            <StatusChange newStatus={status} taskId={task_id} handleStatusDropdownToggle user={user} />
          )}
        </div>
      </div>
      <Link to = {`/home/${task_id}`}  className="flex flex-col gap-3 max-w-[200px] ">
      <div className="text-xs font-medium text-[#89898a] ml-1">
      {' '}
                  {new Date(due_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
      </div>
      <div className="whitespace-nowrap text-xs font-medium capitalize text-[#1b1a17] w-full mb-2 ml-1 overflow-hidden text-ellipsis text-gray-700">
        {description}
      </div>
      <div className={`${
        priority === "high" ? "bg-[#EB5757]" : priority === "medium" ? "bg-[#F2994A]" : "bg-[#C8D9CF]"
      } flex flex-col items-center w-16 px-2 py-px rounded text-xs font-semibold text-white capitalize`}>
        {priority}
      </div>
      
      <div className="border-solid border-[#eaeaea] self-stretch h-px mb-px ml-px bordert borderb-0 borderx-0" />
      <div className="flex flex-row ml-2 gap-2 items-center text-[#89898a] text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10l-2 2m0 0l-2-2m2 2V3m0 7v4m10 5H2a2 2 0 01-2-2V7a2 2 0 012-2h20a2 2 0 012 2v10a2 2 0 01-2 2z" />
        </svg>
        <div className="w-2">
          2
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10l-2 2m0 0l-2-2m2 2V3m0 7v4m10 5H2a2 2 0 01-2-2V7a2 2 0 012-2h20a2 2 0 012 2v10a2 2 0 01-2 2z" />
        </svg>
        <div className="w-2">
          2
        </div>
      </div>
      </Link>
    </div>
  );
};

export default AllTaskSingle;
