import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import { Context } from "../../context/userContext/context";
import avatar from '../../assets/avatar.avif'

const ProjectInfo = ({project_id}) => {
  const [projectData, setProjectData] = useState([]);
  const {user} = useContext(Context);
  // const [projectData, setProjectData] = useState([]);

  // Function to fetch the project data from the API
  const fetchProjectData = async () => {
    try {
      console.log(project_id);
      const response = await axios.get(`${apiUrl}/project/${project_id}`, { headers: { token: `${user.token}` } });
      setProjectData(response.data[0]); // Assuming the response data is an array of project objects
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    if (project_id) {
      fetchProjectData();
    }
  }, [project_id]);
    return (
        <>
        <div className="border-solid border-[#eaeaea] bg-white flex flex-col gap-2 w-full h-[426px] items-start p-8 border rounded">
  <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] mb-6 w-20">
    {projectData.project_title}
  </div>
  <div className="text-sm font-['Inter'] text-[#89898a] self-stretch mb-6 h-[19.89%]">
    {projectData.project_description}
  </div>
  <div className="self-stretch flex flex-row gap-8 items-center mb-1 mr-[141px]">
    <div className="text-xs font-['Inter'] text-[#89898a] mr-16 w-8 shrink-0">
      Client
    </div>
    <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] mr-2 w-16 shrink-0">
      Start date
    </div>
    <div className="text-xs font-['Inter'] text-[#89898a] mr-3 w-12 shrink-0">
      Deadline
    </div>
    <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-20 shrink-0">
      Team members
    </div>
    <div className="text-xs font-['Inter'] text-[#89898a] w-12 shrink-0">
      Reports
    </div>
  </div>
  <div className="self-stretch flex flex-row gap-8 items-center mb-6 mr-[177px]">
    <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] w-24 shrink-0">
      Task Manager
    </div>
    <div className="text-sm font-['Inter'] text-[#1b1a17] w-16 shrink-0">
      7-6-2022
    </div>
    <div className="text-sm font-['Inter'] text-[#1b1a17] w-16 shrink-0">
      7-7-2022
    </div>
    <div className="text-sm font-['Inter'] text-[#1b1a17] mr-20 w-4 shrink-0">
      12
    </div>
    <div className="text-sm font-['Inter'] text-[#1b1a17] w-2 shrink-0">5</div>
  </div>
  <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-20">
    Project leader
  </div>
  <div className="flex flex-row mb-6 gap-4 items-center">
    <img
      src={avatar}
      className="min-h-0 min-w-0 w-10 shrink-0"
    />
    <div className="flex flex-col gap-2 w-32">
      <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] mr-12">
        Collins Mwendwa
      </div>
      <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a]">
        Admin/product manager
      </div>
    </div>
  </div>
  <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-16">
    Project type
  </div>
  <div className="whitespace-nowrap text-xs font-['Inter'] text-[#1b1a17] w-56">
    Software development
  </div>
</div>
        </>
    )
}

export default ProjectInfo