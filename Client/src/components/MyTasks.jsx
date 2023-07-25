import React, { useContext } from 'react';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { TaskContext } from '../context/TaskContext/Context';
import { Context } from '../context/userContext/context';
import axios from 'axios';
import { apiUrl } from '../utils/utils';

const MyTasks = () => {
  const { user } = useContext(Context);
  const { setTasks, getTasks } = useContext(TaskContext);

  // Function to fetch tasks assigned to the current user
  const fetchMyTasks = async () => {
    try {
      const data = await getTasks(false); // Fetch only user's tasks
      setTasks(data); // Set the tasks in the context
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch the tasks when the "Me" option is clicked
  const handleMeClick = () => {
    fetchMyTasks();
  };

  return (
    <div
      className="flex flex-row items-center gap-2 font-['Inter'] font-medium capitalize text-[#89898a] shrink-0 hover:bg-gray-100 rounded p-1"
      title="Only show tasks assigned to me"
      onClick={handleMeClick}
    >
      <Person2OutlinedIcon className="min-h-0 min-w-0 w-6 shrink-0" />
      <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
        Me
      </div>
    </div>
  );
};

export default MyTasks;
