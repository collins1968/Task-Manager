import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { Link } from 'react-router-dom';
import FilterTasks from './FilterTasks';
import MyTasks from './MyTasks';
import { TaskContext } from '../context/TaskContext/Context';
import { useContext } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const AddNewTask = () => {
  const { setTasks } = useContext(TaskContext);
    return (
<div className="border-solid border-[#eaeaea] bg-white flex flex-row justify-between w-100% h-20 items-center px-6 border rounded">
  <Link to="/home/new-task">
  <div className="bg-[#0177fd] flex flex-row justify-center gap-2 h-10 items-center pl-5 pr-4 py-2 rounded-lg">
    <AddIcon
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="whitespace-nowrap font-['Inter'] font-medium capitalize text-white w-3/4">
      Add new task
    </div>
  </div>
  </Link>
  <div className='flex flex-row gap-6'>
    <Link to="/home">
    <div className='flex flex-row gap-2 hover:bg-gray-100 p-2'>
  <DashboardOutlinedIcon  
    className="min-h-0 min-w-0 w-6 shrink-0"
  />
  <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
    Board
  </div>
  </div>
    </Link>
    <Link to="/home/TaskTable">
    <div className='flex flex-row gap-2 hover:bg-gray-100 p-2 '>
  <TableRowsOutlinedIcon  
    className="min-h-0 min-w-0 w-6 shrink-0"
  />
  <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
    Table
  </div>
  </div>
    </Link>
  <Link to="/home/taskList">
  <div className='flex flex-row gap-2 hover:bg-gray-100 p-2'>
  <FormatListBulletedOutlinedIcon
    className="min-h-0 min-w-0 w-6 shrink-0"
  />
  <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
    List
  </div>
  </div>
  </Link>
  <FilterTasks  />
  {/* <MyTasks /> */}
  <MyTasks setTasks={setTasks} />
  
  </div>
</div>
    )
}

export default AddNewTask