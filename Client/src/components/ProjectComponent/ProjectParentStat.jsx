import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/userContext/context";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import { useParams } from "react-router-dom";
import PieChart from "./PieChart"
import BarChart from "./BarChart"
import DonutChart from "./DonutChart";

const ProjectStatsParent = ({project_id}) => {
//   const { project_id } = useParams();
  const [projectStats, setProjectStats] = useState({});
  const {user} = useContext(Context);
  useEffect(() => {
    const fetchProjectStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects/${project_id}`, { headers: { token: `${user.token}` } });
        setProjectStats(response.data[0]);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching project statistics:", error);
      }
    };
    fetchProjectStats();
  }, [project_id]);
   // Separate datasets for the charts
   const dataPieChart = [
    { name: "Completed", value: projectStats.CompletedTasks },
    { name: "In Progress", value: projectStats.TasksInProgress },
    { name: "Open", value: projectStats.OpenTasks },
  ];

  const dataBarChart = [
    { name: "High Priority", value: projectStats.HighPriorityTasks },
    { name: "Medium Priority", value: projectStats.MediumPriorityTasks },
    { name: "Low Priority", value: projectStats.LowPriorityTasks },
  ];

  const dataDonutChart = [
    { name: "Total Tasks", value: projectStats.TotalTasks },
    { name: "Completed", value: projectStats.CompletedTasks },
  ];
// const data = [
//     { name: "Completed", value: 0 },
//     { name: "In Progress", value: 1 },
//     { name: "Open", value: 0 },
//   ];

  return (
    <div>
      <h2>Project Statistics</h2>
      <PieChart data={dataPieChart} />
      <BarChart data={dataBarChart} />
      <DonutChart data={dataDonutChart} />
    </div>
  );
};

export default ProjectStatsParent;
