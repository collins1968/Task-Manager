// TaskContext.js
import React, { createContext, useEffect, useState , useContext} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import { Context } from "../userContext/context";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [tasksFound, setTasksFound] = useState(true);

  // Updated getTasks function with a parameter to fetch all tasks or user's tasks
  const getTasks = async (fetchAllTasks = true) => {
    try {
      let url = fetchAllTasks ? `${apiUrl}/tasks` : `${apiUrl}/task`;
      const { data } = await axios.get(url, { headers: { token: `${user.token}` } });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Fetch all tasks when the application loads
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(), // Fetch all tasks by default
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <TaskContext.Provider
      value={{
        data,
        tasks,
        isLoading,
        error,
        setTasks,
        tasksFound,
        setTasksFound,
        getTasks, // Expose the getTasks function to be used by other components
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
