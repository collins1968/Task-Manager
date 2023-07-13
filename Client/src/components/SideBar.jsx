import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Link } from 'react-router-dom';
import AddTaskForm from './AddNewTaskForm';

const SideBar = () => {
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  useEffect(() => {
    // Set the active menu item based on the current route
    setActiveMenuItem(location.pathname);
  }, [location]);

  const handleMenuClick = () => {
    collapseSidebar();
  };

  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={handleMenuClick}
          style={{ textAlign: 'center' }}
        >
          <h1>TaskPro</h1>
        </MenuItem>
        <Link to="/home">
          <MenuItem
            icon={<HomeOutlinedIcon />}
            active={activeMenuItem === '/home'}
            onClick={handleMenuClick}
          >
            Home
          </MenuItem>
        </Link>
        <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
        <SubMenu icon={<ContactsOutlinedIcon />} label="Projects">
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 1</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 2</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Project 3</MenuItem>
        </SubMenu>
        <Link to="/home/new-task">
          <MenuItem
            icon={<AddTaskOutlinedIcon />}
            active={activeMenuItem === '/home/new-task'}
            onClick={handleMenuClick}
          >
            Add Task
          </MenuItem>
        </Link>
        <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
        <Link to="/home/FAQs">
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            active={activeMenuItem === '/home/FAQs'}
            onClick={handleMenuClick}
          >
            FAQ
          </MenuItem>
        </Link>
        <Link to="/home/calendar">
          <MenuItem
            icon={<CalendarTodayOutlinedIcon />}
            active={activeMenuItem === '/home/calendar'}
            onClick={handleMenuClick}
          >
            Calendar
          </MenuItem>
        </Link>
        <MenuItem icon={<LogoutOutlinedIcon />}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
