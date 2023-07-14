import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutComponent';
import { useState } from 'react';
const sideBar1 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleWindowResize = () => {
    setCollapsed(window.innerWidth <= 760);
  };
  // const {collapseSidebar} = useProSidebar();
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
            <h1>TaskPro</h1>
          </MenuItem>
          <Link to="/home"><MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem></Link>
          
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <SubMenu icon={<ContactsOutlinedIcon />} label='projects'>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>Task Manager</MenuItem></Link>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>E-Commerce</MenuItem></Link>
            <Link to="./project"><MenuItem icon={<ContactsOutlinedIcon />}>Social Media</MenuItem></Link>
          </SubMenu>
          <Link to="./new-task" > <MenuItem icon={<AddTaskOutlinedIcon />}>Add Task</MenuItem> </Link>
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
