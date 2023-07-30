import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskContext/Context";
import ProfileCircle from "./ProfileCircle";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StatusChange from "./StatusChange";
import axios from "axios";
import { apiUrl } from "../utils/utils";
import { Context } from "../context/userContext/context";
import {toast} from "react-toastify"
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';


const TaskDetailPage = () => {
  const { user } = useContext(Context);
  const [comments, setComments] = useState([]); // Initialize with an empty array for comments
  const [newComment, setNewComment] = useState(""); // State to store the new comment text
  const [assignedUsers, setAssignedUsers] = useState([]);
  // Get the task_id from the URL using useParams hook
  const { task_id } = useParams();
  // Access the tasks from the TaskContext
  const { tasks } = useContext(TaskContext);
  // Find the selected task by matching the task_id
  // const selectedTask = tasks.find((task) => task.task_id === task_id);
  const selectedTask = tasks.find((task) => task.task_id === parseInt(task_id));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        // Make a GET request to fetch assigned users
        const response = await axios.get(`${apiUrl}/task/${task_id}/users` , { headers: { token: `${user.token}` } });
        setAssignedUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignedUsers(); // Call the function to fetch assigned users
  }, [task_id]);
  useEffect(() => {
    // Function to fetch comments by task_id
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/task/${task_id}/comment`, { headers: { token: `${user.token}` } });
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments(); // Call the function to fetch comments
  }, [task_id]);

  useEffect(() => {
    setIsLoading(false);
  }, [selectedTask]);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const handleStatusDropdownToggle = () => {
    setIsStatusDropdownOpen((prevState) => !prevState);
  };

const handleDelete = async (taskId) => {
    try {
      // Call the API to delete the task
      await axios.delete(`${apiUrl}/task/${taskId}`, {
        headers: { token: `${user.token}` },
      });
      // Show a success toast notification
      toast.success("Task deleted successfully.");
     
    } catch (error) {
      // Show a toast notification for unauthorized action
      toast.error("Only the task creator can delete the task.");
    }
  };
  

const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return; // Prevent adding empty comments
    }

    try {
      // Make a POST request to add a comment to the task
      await axios.post(`${apiUrl}/task/${task_id}/comment`, { content: newComment }, { headers: { token: `${user.token}` } });
      // Fetch the updated comments after adding a new comment
      const response = await axios.get(`${apiUrl}/task/${task_id}/comment`, { headers: { token: `${user.token}` } });
      setComments(response.data);
      setNewComment(""); // Clear the new comment input field
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (newStatus) => {
    
    setIsStatusDropdownOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedTask) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Task Not Found</h2>
          <p>Sorry, the task you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Assigned Users Sidebar */}
      <div className="bg-white rounded-lg shadow-lg p-4 flex-none w-full md:w-64 md:mr-8">
        <h3 className="text-lg font-bold mb-4">Assigned Users</h3>
        <ul className="space-y-2">
          {assignedUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-2 transition duration-300 hover:bg-gray-100 rounded p-2 cursor-pointer"
            >
              <ProfileCircle
                firstName={user.first_name}
                lastName={user.last_name}
                name={`${user.first_name} ${user.last_name}`}
                imageUrl={user.profilePicture}
                size={10}
              />
              <span className="text-sm font-medium">
                {user.first_name} {user.last_name}
              </span>
            </li>
          ))}
        </ul>

        {/* Add New User Button */}
        <button className="flex items-center mt-4 space-x-2 text-[#F2994A] hover:text-[#F2994A] focus:outline-none">
          <PersonAddAltOutlinedIcon fontSize="large" />
          <span className="text-sm font-medium">Add User</span>
        </button>
      </div>
   
  
    {/* Task Details */}
    <div className="bg-white rounded-lg shadow-lg p-4 flex-1 transition-shadow hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
        <button
  onClick={handleStatusDropdownToggle}
  className={`flex items-center justify-center] bg-indigo-500 text-white text-xs font-medium rounded px-4 py-2 transition-colors hover:bg-opacity-80 cursor-pointer`}
>
            {selectedTask.status}
            <ExpandMoreIcon className="ml-1" />
          </button>
          {isStatusDropdownOpen && (
            <StatusChange handleStatusChange={handleStatusChange} />
          )}
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`${
              selectedTask.priority === "High"
                ? "bg-red-500"
                : selectedTask.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } text-white text-xs font-medium rounded px-2 py-1`}
          >
            {selectedTask.priority}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {selectedTask.category}
          </div>
        </div>
      </div>
      <h2>{selectedTask.title}</h2>
      <p className="text-gray-600 text-sm mb-6">{selectedTask.description}</p>
      <div className="text-xs text-gray-600 mb-2"><strong>Start date:</strong>{' '}
                  {new Date(selectedTask.due_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</div>
      <div className="flex justify-between items-center"></div>
      <div className="text-xs text-gray-600 mb-2"><strong>Due date:</strong>{' '}
                  {new Date(selectedTask.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</div>
      <div className="flex justify-between items-center">
  <button
    onClick={() => handleEdit(selectedTask.task_id)}
    className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(selectedTask.task_id)}
    className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
  >
    Delete
  </button>
</div>


      <div className="border-b border-gray-300 mt-4 mb-4" />
  
      {/* Comments Section */}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          <div className="comments-container space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-1 rounded-lg">
                <p className="text-gray-600 mb-1">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  @ {comment.user_name}  {new Date(comment.created_at).toLocaleString()}
                </p>
                
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-4">
        <input
  type="text"
  placeholder="Add a comment..."
  value={newComment}
  onChange={(e) => setNewComment(e.target.value)}
  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
/>
          <button
            onClick={handleAddComment}
            className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  </div>
  
    );
  };
  
  export default TaskDetailPage;

