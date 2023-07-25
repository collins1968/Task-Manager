import { Context } from "../../context/userContext/context";
import ProjectInfo from "./ProjectInfo";
import ProjectStats from "./ProjectStats";
import TodayTaskProjectPage from "./TodayTaskProjectPage";
import axios from "axios";
import ProjectStatsParent from "./ProjectParentStat";
import { useState, useEffect, useContext } from "react";
import { apiUrl } from "../../utils/utils";
import { useParams } from "react-router-dom";


const Project = () => {
const {project_id} = useParams();
     // State to hold the project data fetched from the API
 const {user} = useContext(Context);
  const [projectData, setProjectData] = useState([]);

  // Function to fetch the project data from the API
  const fetchProjectData = async () => {
    try {
      console.log(project_id);
      const response = await axios.get(`${apiUrl}/projects`, { headers: { token: `${user.token}` } });
      setProjectData(response.data); // Assuming the response data is an array of project objects
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    console.log(project_id);
    // Fetch the project data when the component mounts
    // fetchProjectData();
  }, []);
    return (
        <div className="flex flex-row gap-4 mb-0 ml-[10px] mr-8 mt-[10px]">
        {/* <div className="flex flex-row gap-4 w-3/5"> */}
        <div className="flex flex-col gap-4">
        <ProjectInfo />
            <ProjectStatsParent project_id={project_id} />
            </div>
          
          <ProjectStats project_id={project_id} />
            {/* <TodayTaskProjectPage /> */}
        {/* </div> */}
        
        </div>
    )
}

export default Project;