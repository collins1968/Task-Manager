import React, { useState, useEffect, useContext } from "react";
import AllTaskSingle from "./AllTaskSingle";
import { TaskContext } from "../context/TaskContext/Context";
import Loaders from "./Loaders";
import ErrorComponent from "../Error";
import AddNewTask from "./AddNewTaskButton";

const AllTaskColumn = () => {
  const {tasks, isLoading, error, taskFound} = useContext(TaskContext);


  // Create arrays for each status
  const openTasks = tasks.filter((task) => task.status === "Open");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const overdueTasks = tasks.filter((task) => task.status === "Overdue");

  if (isLoading) {
    // return <div>Loading...</div>;
    return (
      <>
      <div className="container mx-auto mt-8">
        <Loaders />
      </div>
      </>
    )
  }
  if (error) {
    return (
      <>
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
    <div className="bg-white rounded shadow-md p-8">
    <div className="grid grid-cols-4 gap-4">
      <StatusColumn status="Open" tasks={openTasks} />
      <StatusColumn status="In Progress" tasks={inProgressTasks} />
      <StatusColumn status="Completed" tasks={completedTasks} />
      <StatusColumn status="Overdue" tasks={overdueTasks} />
    </div>
  </div>
);
};

// StatusColumn component to display tasks for a specific status
const StatusColumn = ({ status, tasks }) => {
    return (
      <div className="p-4 bg-gray-50 rounded hover:shadow-md transition-shadow gap-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-700 capitalize">
            {status}
          </div>
          <div className="text-sm font-semibold text-gray-600">
            ({tasks.length})
          </div>
        </div>
        {tasks.map((task) => (
          <AllTaskSingle key={task.id} {...task} />
        ))}
      </div>
    );
  };

export default AllTaskColumn;
