import ProjectInfo from "./ProjectInfo";
import ProjectStats from "./ProjectStats";
import ProjectStatsParent from "./ProjectParentStat";
import { useParams } from "react-router-dom";


const Project = () => {
  const {project_id} = useParams();
    return (
        <div className="flex flex-row gap-4 mb-0 ml-[10px] mr-8 mt-[10px]">
        {/* <div className="flex flex-row gap-4 w-3/5"> */}
        <div className="flex flex-col gap-4">
        <ProjectInfo project_id={project_id} />
            <ProjectStatsParent project_id={project_id} />
            </div>
          <ProjectStats project_id={project_id} />
        </div>
    )
}

export default Project;