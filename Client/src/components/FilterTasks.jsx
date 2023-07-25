import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../utils/utils";
import { TaskContext } from "../context/TaskContext/Context";
import { Context } from "../context/userContext/context";

const FilterTasks = () => {
  const {tasksFound, setTasksFound } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(Context);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { tasks, setTasks } = useContext(TaskContext);

  const handleFilterApply = async () => {
    try {
      const filters = {};

      if (selectedProjectName) {
        filters.project_name = selectedProjectName;
      }

      if (selectedPriority) {
        filters.priority = selectedPriority;
      }

      if (selectedStatus) {
        filters.status = selectedStatus;
      }

      const { data } = await axios.get(`${apiUrl}/AllTasks`, {
        params: filters,
        headers: { token: `${user.token}` },
      });

      setTasks(data);
      setIsOpen(false); // Close the filter menu after applying filters
      setTasksFound(tasks.length > 0);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // If the backend responds with a 404 status, it means no tasks were found
        console.log("No tasks found with the selected filters.");
      
        setTasks([]); // You can set an empty array or any default value for tasks in this case
        setTasksFound(false);
      } else {
        console.error("Error applying filters:", error);
        // Handle other error cases here if needed
      }
    }
  };

  return (
    // <div className='flex flex-row gap-2'>
    <div className="relative flex flex-row gap-2 hover:bg-gray-100 p-2">
      <div onClick={() => setIsOpen(!isOpen)}>
        <FilterAltIcon className="min-h-0 min-w-0 w-6 shrink-0" />
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-50 bg-white rounded-lg shadow-md border border-gray-200">
          {/* Add filter options here */}
          <div className="px-4 py-2 border-b border-gray-200">
            <label className="font-['Inter'] text-[#89898a] block mb-1">Project:</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={selectedProjectName}
              onChange={(e) => setSelectedProjectName(e.target.value)}
            />
          </div>
          <div className="px-4 py-2 border-b border-gray-200">
            <label className="font-['Inter'] text-[#89898a] block mb-1">Priority:</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="px-4 py-2">
            <label className="font-['Inter'] text-[#89898a] block mb-1">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="flex justify-center py-2">
            <button
              className="px-4 py-2 bg-[#0177fd] text-white rounded-lg"
              onClick={handleFilterApply}
            >
              Apply
            </button>
          </div>
        </div> 
      )} 
      <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
        Filter
      </div>
    </div>

  );
};

export default FilterTasks;
