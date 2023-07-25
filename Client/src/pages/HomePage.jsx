import "../styles/homePage.css"
import SideBar1 from "../components/sideBar1";
import AllTasks from "../components/AllTasks";
import NavBar from "../components/NavBar";
import AddTaskForm1 from "../components/AddNewTaskForm1";
import { Route, Routes } from 'react-router-dom';
import CalendarComponent from "../components/Calendar";
import FAQComponent from "../components/FAQComponent";
import  ProfilePage from "../components/profile";
import Project from "../components/ProjectComponent/ProjectPage";
import TaskList from "../components/tasklist";
import TaskTable from "../components/TaskTable";
import TaskDetailPage from "../components/TaskDetailPage";


const HomePage = () => {
  return (
    <div style={{ maxHeight: "100vh" , display: "flex" }}>
      <SideBar1/>
      <div className="flex flex-col w-screen">
        <div>
        <NavBar  />
        </div>
        <div className="">
          <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/new-task" element={<AddTaskForm1 />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/FAQs" element={<FAQComponent />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/projects/:project_id" element={<Project/>} />
        <Route path="/taskList" element={<TaskList/>} />
        <Route path="/taskTable" element={<TaskTable/>} />
        <Route path="/:task_id" element={<TaskDetailPage/>}/>
          </Routes>
      </div>
      </div>
    </div>
  )
}

export default HomePage;