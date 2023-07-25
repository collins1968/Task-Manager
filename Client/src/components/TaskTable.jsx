import React, { useContext } from "react";
import TaskTableComponent from "./TaskTableComponent";
import { TaskContext } from "../context/TaskContext/Context";
import AddNewTask from "./AddNewTaskButton";
import ErrorComponent from "../Error";

const TaskTable = () => {
  // Assuming you have a list of tasks with the following structure
  const { tasks, isLoading, error, taskFound } = useContext(TaskContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorComponent message="Error fetching tasks" />;
  }

  return (
    <>
      <AddNewTask />
      <div className="container mx-auto mt-8">
        <TaskTableComponent tasks={tasks} />
      </div>
    </>
  );
};
export default TaskTable;
