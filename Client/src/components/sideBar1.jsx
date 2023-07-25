import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutComponent';
import { useContext, useState, useEffect } from 'react';
import logo from '../assets/tasklogo.png';
import { Context } from '../context/userContext/context';
import axios from 'axios';
import { apiUrl } from '../utils/utils';
const sideBar1 = () => {
  const {user} = useContext(Context)
    // State to hold the project titles fetched from the API
  const [projectTitles, setProjectTitles] = useState([]);

  // Function to fetch the project titles from the database
  const fetchProjectTitles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects`, { headers: { token: `${user.token}` } });
      setProjectTitles(response.data); // Assuming the response data is an array of project objects
    } catch (error) {
      console.error('Error fetching project titles:', error);
    }
  };

  useEffect(() => {
    // Fetch the project titles when the component mounts
    fetchProjectTitles();
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const handleWindowResize = () => {
    setCollapsed(window.innerWidth <= 760);
  };
  return (
    <Sidebar collapsed={collapsed} style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              setCollapsed(!collapsed);
              // collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h1></h1>
            <img className='pt-[20px] m-[20px]' src={logo} alt="" />
          </MenuItem>
          <Link to="/home"><MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem></Link>
          
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <SubMenu icon={<ContactsOutlinedIcon />} label='Projects'>
      {projectTitles.map((project) => (
        <Link to={`./projects/${project.project_id}`} key={project.project_id}>
          <MenuItem icon={<ContactsOutlinedIcon />}>{project.project_title}</MenuItem>
        </Link>
      ))}
    </SubMenu>
          {/* <SubMenu icon={<ContactsOutlinedIcon />} label='projects'>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>Task Manager</MenuItem></Link>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>E-Commerce</MenuItem></Link>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>Social Media</MenuItem></Link>
          </SubMenu> */}
          <Link to="/home/new-task" > <MenuItem icon={<AddTaskOutlinedIcon />}>Add Task</MenuItem> </Link>
          <Link to="./profile">
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          </Link>
          <Link to="./FAQs">
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          </Link>
          <Link to="./calendar">
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
          </Link>
          <LogoutButton />
        </Menu>
      </Sidebar>
  )
}

export default sideBar1
