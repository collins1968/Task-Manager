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
const sideBar1 = () => {
  const {collapseSidebar} = useProSidebar();
  return (
    <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h1>TaskPro</h1>
          </MenuItem>
          <Link to="/home"><MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem></Link>
          
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <SubMenu icon={<ContactsOutlinedIcon />} label='projects'>
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 1</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 2</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 3</MenuItem>
          </SubMenu>
          <Link to="/home/new-task" > <MenuItem icon={<AddTaskOutlinedIcon />}>Add Task</MenuItem> </Link>
          <Link to="/home/profile">
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          </Link>
          <Link to="/home/FAQs">
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          </Link>
          <Link to="/home/calendar">
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
          </Link>
          <LogoutButton />
        </Menu>
      </Sidebar>
  )
}

export default sideBar1
