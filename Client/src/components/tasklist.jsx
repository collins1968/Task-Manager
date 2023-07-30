import { useEffect, useState, useContext } from "react";
import AddNewTask from "./AddNewTaskButton";
import { TaskContext } from "../context/TaskContext/Context";
import Loaders from "./Loaders";
import ErrorComponent from "../Error";
import { Link } from "react-router-dom";
import { IconButton, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import { apiUrl } from "../utils/utils";
import { Context } from "../context/userContext/context";
import {toast} from "react-toastify"


const TaskList = () => {
  const { tasks, isLoading, error, taskFound } = useContext(TaskContext);
  const handleEdit = (taskId) => {
    // Implement edit task logic here
    console.log("Edit task with ID:", taskId);
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
      // Check if the error status is 403 (Forbidden) - Unauthorized deletion
      if (error.response && error.response.status === 403) {
        toast.error("Only the task creator can delete the task.");
      } else {
        // Show a generic error toast notification for other errors
        toast.error("An error occurred while deleting the task.");
      }
    }
  };
  const handleChangeStatus = (taskId, newStatus) => {
    // Implement change status logic here
    console.log("Change status of task with ID:", taskId, "to", newStatus);
  };

  if (isLoading) {
    // return <div>Loading...</div>;
    return (
      <>
      <AddNewTask/>
      <div className="container mx-auto mt-8">
        <Loaders />
      </div>
      </>
    )
  }
  if (error) {
    return (
      <>
      <AddNewTask/>
      <ErrorComponent message="error fetching tasks"/>
      </>
    );
  }
  if(taskFound === true) {
    return (
    <div className="text-center text-gray-600">No tasks found with the selected filters.</div>
    )
  }
  return (
    <>
    <AddNewTask/>
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <IconButton />
      <ul>
          {tasks.map((task) => (
            <Link key={task.task_id} to={`/home/${task.task_id}`}>
              <Paper elevation={3} className="p-4 mb-4">
                <div className="mb-2">
                  <strong className="font-semibold">Title:</strong> {task.title}
                  <div className={`${
        task.priority === "high" ? "bg-[#EB5757]" : task.priority === "medium" ? "bg-[#F2994A]" : "bg-[#C8D9CF]"
      } flex flex-col items-center w-16 px-2 py-px rounded text-xs font-semibold text-white capitalize`}>
        {task.priority}
      </div>
                </div>

                <div className="mb-2">
                  <strong className="font-semibold">Description:</strong> {task.description}
                </div>
                
                <div className="mb-2">
                  <strong className="font-semibold">Due date:</strong> {' '}
                  {new Date(task.due_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center mb-2">
                  <strong className="font-semibold">Status:</strong>
                  <span className="ml-2 text-blue-500 font-medium">{task.status}</span>
                  {task.status === "Completed" ? (
                    <CheckCircleIcon className="ml-2 text-green-500" />
                  ) : null}
                </div>
                
                {/* <div className="flex items-center"> */}
                  {/* <IconButton
                    size="small"
                    className="mr-2"
                    color="primary"
                    onClick={() => handleChangeStatus(task.task_id, "In Progress")}
                  >
                    <CheckCircleIcon /> 
                  </IconButton>
                  {/* <IconButton
                    size="small"
                    className="mr-2"
                    color="success"
                    onClick={() => handleChangeStatus(task.task_id, "Completed")}
                  >
                    <CheckCircleIcon />
                  </IconButton> */}
                  {/* <IconButton
                    size="small"
                    component={Link}
                    to={`/edit-task/${task.task_id}`}
                    className="mr-2"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(task.task_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div> */}
              </Paper>
              </Link>
          ))}
        </ul> 
    </div>

    </>
  );
};

export default TaskList;
