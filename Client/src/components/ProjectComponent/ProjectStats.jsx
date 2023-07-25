import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/userContext/context";
import { apiUrl } from "../../utils/utils";
import axios from "axios";

const ProjectStats = ({ project_id }) => {
  const { user } = useContext(Context);
  const [projectStats, setProjectStats] = useState({});

  // Function to fetch project statistics data from the API
  const fetchProjectStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects/${project_id}`, {
        headers: { token: `${user.token}` },
      });
      setProjectStats(response.data[0]); // Assuming the response data is an object
    } catch (error) {
      console.error("Error fetching project statistics:", error);
    }
  };

  // Fetch project statistics data when the component mounts
  useEffect(() => {
    if (project_id) {
      fetchProjectStats();
    }
  }, [project_id]);

  return (
    <div className="border-solid border-[#eaeaea] bg-white flex flex-col gap-5 w-full h- px-8 py-10 border rounded">
      {/* Title */}
      <div className="flex flex-row justify-between items-center mb-px mx-2">
        <div className="whitespace-nowrap text-sm font-semibold capitalize text-[#1b1a17] w-24 shrink-0">
          Project stats
        </div>
        <img
          src="https://file.rendit.io/n/vnwu92aXNW312bRrNA2c.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Project Stats"
        />
      </div>

      {/* Time Remaining */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row justify-center gap-3 h-16 shrink-0 items-center border rounded">
        <img
          src="https://file.rendit.io/n/H0fFaVe2fxp2ETM3VTq7.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Time Remaining"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] w-[273px] h-[30.74%]">
          Time remaining
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#eb5757] w-4 shrink-0">
          {projectStats.TimeRemaining}
        </div>
      </div>

      {/* Created Tasks */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row justify-center gap-3 h-16 shrink-0 items-center border rounded">
        <img
          src="https://file.rendit.io/n/gD4FZQi2x8E0f6y6gyWO.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Created Tasks"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] w-[273px] h-[30.74%]">
          Created tasks
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#219653] w-4 shrink-0">
          {projectStats.TotalTasks}
        </div>
      </div>

      {/* Tasks in Progress */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
        <img
          src="https://file.rendit.io/n/keLOL9LkhSIoK7jlKcZ7.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Tasks in Progress"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] mr-px w-64 h-[30.74%]">
          Tasks in progress
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#f2994a] w-4 shrink-0">
          {projectStats.TasksInProgress}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
        <img
          src="https://file.rendit.io/n/iZ9RVXhNNa9sexgt7bex.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Upcoming Tasks"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] mr-1 w-64 h-[30.74%]">
          Upcoming tasks
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#0177fd] w-2 shrink-0">
          {projectStats.OpenTasks}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="border-dashed border-[#bdbdbd] flex flex-col justify-center gap-3 h-20 shrink-0 px-4 border rounded">
        <div className="flex flex-row justify-between mr-4 items-center">
          <div className="text-xs font-medium capitalize text-[#1b1a17] w-[107px] shrink-0 h-full">
            Overall process
          </div>
          <div className="text-center text-xs font-medium capitalize text-[#0177fd] w-4 shrink-0">
            {projectStats.OverallProgress}
          </div>
        </div>
        <div className="bg-[#f1f2f6] flex flex-col mr-4 rounded">
          <div
            className="bg-[#0177fd] mr-20 h-1 shrink-0 rounded"
            style={{ width: `${projectStats.OverallProgress}%` }}
          />
        </div>
      </div>

      {/* Medium Priority Tasks */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
        <img
          src="https://file.rendit.io/n/iZ9RVXhNNa9sexgt7bex.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Medium Priority Tasks"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] mr-1 w-64 h-[30.74%]">
          Medium Priority Tasks
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#f2994a] w-2 shrink-0">
          {projectStats.MediumPriorityTasks}
        </div>
      </div>

      {/* Low Priority Tasks */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
        <img
          src="https://file.rendit.io/n/iZ9RVXhNNa9sexgt7bex.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="Low Priority Tasks"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] mr-1 w-64 h-[30.74%]">
          Low Priority Tasks
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#f2994a] w-2 shrink-0">
          {projectStats.LowPriorityTasks}
        </div>
      </div>

      {/* High Priority Tasks */}
      <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
        <img
          src="https://file.rendit.io/n/iZ9RVXhNNa9sexgt7bex.svg"
          className="min-h-0 min-w-0 w-6 shrink-0"
          alt="High Priority Tasks"
        />
        <div className="text-xs font-medium capitalize text-[#1b1a17] mr-1 w-64 h-[30.74%]">
          High Priority Tasks
        </div>
        <div className="text-center text-xs font-medium capitalize text-[#f2994a] w-2 shrink-0">
          {projectStats.HighPriorityTasks}
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
