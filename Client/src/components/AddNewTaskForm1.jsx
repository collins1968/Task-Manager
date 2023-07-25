import { useEffect, useState, useContext } from "react";
import { apiUrl } from "../utils/utils";
import Select from "react-select";
import axios from "axios";
import {Context} from "../context/userContext/context"
import {toast} from "react-toastify"


const AddTaskForm1 = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUsers, setAssignedUsers] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);


  const {user} = useContext(Context);

  useEffect(() => {
    //fetch users from API
    axios.get(`${apiUrl}/users`)
    .then((response) => {
        const options = response.data.map((user)=>({
            value: user.user_id,
            label: user.first_name + " " + user.last_name
        }));
        setUserOptions(options);
    })
    .catch((error) => {
        console.error(error);
    });
    //fetch projects from API
    axios.get(`${apiUrl}/projects`, { headers: { token: `${user.token}` }})
    .then((response) => {
        const options = response.data.map((project)=>({
            value: project.project_id,
            label: project.project_title
        }));
        setProjectOptions(options);
    })
    .catch((error) => {
        console.error(error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform task creation logic here
    // You can access the form values from the state variables
    const taskData = {
      title: taskTitle,
      description: TaskDescription,
      due_date: endDate,
      priority,
      assigned_users: assignedUsers.map((option) => option.value).join(","),
      project_id: projectName.value,
      start_date: startDate
    };

    // Make API call to create task and assign users
    // Replace 'apiEndpoint' with your actual API endpoint
    axios.post(`${apiUrl}/tasks`, taskData, { headers: { token: `${user.token}` }})
      .then((response) => {
        console.log(response.data);
        toast.success("task created successfully")
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="taskTitle" className="block mb-1 font-bold">
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="projectName" className="block mb-1 font-bold">
          Project Name
        </label>
        <Select
          id="projectName"
          value={projectName}
          onChange={(selectedOption) => setProjectName(selectedOption)}
          options={projectOptions}
          className="basic-multi-select"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="TaskDescription" className="block mb-1 font-bold">
          Task Description
        </label>
        <textarea
          id="TaskDescription"
          value={TaskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-1 font-bold">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block mb-1 font-bold">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block mb-1 font-bold">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        >
          <option value="">Select a Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    
      <div className="mb-4">
        <label htmlFor="assignedUsers" className="block mb-1 font-bold">
          Assigned Users
        </label>
        <Select
          id="assignedUsers"
          value={assignedUsers}
          onChange={(selectedOptions) => setAssignedUsers(selectedOptions)}
            // setAssignedUsers(selectedOptions.map((option) => option.value))}
          options={userOptions} // Replace with your user options array
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm1;
