import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import Axios for API requests
import AllTaskSingle from "./AllTaskSingle";
import { TaskContext } from "../context/TaskContext/Context";

const AllTaskColumn1 = () => {
  const { data, isLoading, error } = useContext(TaskContext);
  const openTasks =data && data.filter((task) => task.status === "Open");
  const inProgressTasks =data && data.filter((task) => task.status === "in progress");
  const completedTasks =data && data.filter((task) => task.status === "Completed");
  const overdueTasks =data && data.filter((task) => task.status === "Overdue");


  if (isLoading) {
    return (
      <>
        <div className="container mx-auto mt-8">
          please wait...
        </div>
      </>
    )
  }
  if (error) {
    return <div>Error fetching tasks</div>;
  }

  return (
    <div className="bg-white flex flex-row justify-around pt-8 items-start rounded">
      <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
          <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
            Open{" "}
          </div>
          <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
            ({openTasks.length})
          </div>
        </div>
        {openTasks.map((task) => (
          <AllTaskSingle
            key={task.id} // Assuming each task has a unique ID, replace 'id' with the actual key
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            date={task.due_date}
            commentsCount="0"
          />
        ))}
      </div>

      <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
          <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
            In Progress{" "}
          </div>
          <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
            ({inProgressTasks.length})
          </div>
        </div>
        {inProgressTasks.map((task) => (
          <AllTaskSingle
            key={task.id} // Assuming each task has a unique ID, replace 'id' with the actual key
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            date={task.due_date}
            commentsCount="0"
          />
        ))}
      </div>

      <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
          <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
            Completed{" "}
          </div>
          <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
            ({completedTasks.length})
          </div>
        </div>
        {completedTasks.map((task) => (
          <AllTaskSingle
            key={task.id} // Assuming each task has a unique ID, replace 'id' with the actual key
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            date={task.due_date}
            commentsCount="0"
          />
        ))}
      </div>

      <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
          <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
            Overdue{" "}
          </div>
          <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
            ({overdueTasks.length})
          </div>
        </div>
        {overdueTasks.map((task) => (
          <AllTaskSingle
            key={task.id} // Assuming each task has a unique ID, replace 'id' with the actual key
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            date={task.date}
            commentsCount="0"
          />
        ))}
      </div>
    </div>
  );
};

export default AllTaskColumn1;
