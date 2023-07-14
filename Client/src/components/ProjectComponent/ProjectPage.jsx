import ProjectInfo from "./ProjectInfo";
import ProjectStats from "./ProjectStats";
import RecentActivity from "./RecentActivity";
import TodayTaskProjectPage from "./TodayTaskProjectPage";

const Project = () => {
    return (
        <div className="flex flex-row gap-4 mb-0 ml-[10px] mr-8 mt-[10px]">
        <div className="flex flex-col gap-4 w-3/5">
            <ProjectInfo />
            <TodayTaskProjectPage />
        </div>
        <div className="flex flex-col gap-4">
            <ProjectStats />
            <RecentActivity />
            </div>
        </div>
    )
}

export default Project;