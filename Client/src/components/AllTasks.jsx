import AllTaskColumn from "./AllTaskColumn"
import AddNewTask from "./AddNewTaskButton"
const AllTasks = () => {
    return (
      <>
      <AddNewTask />
      <div className="bg-white flex flex-row justify-around pt-8  items-start rounded">
        <AllTaskColumn />
        <AllTaskColumn />
        <AllTaskColumn />
        <AllTaskColumn />
        </div>
        </>
    )
}

export default AllTasks