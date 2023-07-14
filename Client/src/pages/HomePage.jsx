import "../styles/homePage.css"
import SideBar1 from "../components/sideBar1";
import AllTasks from "../components/AllTasks";
import NavBar from "../components/NavBar";
import AddTaskForm from "../components/AddNewTaskForm";
import { Route, Routes } from 'react-router-dom';
import CalendarComponent from "../components/Calendar";
import FAQComponent from "../components/FAQComponent";
import  ProfilePage from "../components/profile"
import Project from "../components/ProjectComponent/ProjectPage";


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
        <Route path="/new-task" element={<AddTaskForm />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/FAQs" element={<FAQComponent />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project" element={<Project/>} />

          </Routes>
      </div>
      </div>
    </div>
  )
}

export default HomePage;