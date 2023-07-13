import AddIcon from '@mui/icons-material/Add';

const AddNewTask = () => {
    return (
<div className="border-solid border-[#eaeaea] bg-white flex flex-row gap-4 w-full h-20 items-center px-4 border rounded">
  <div className="bg-[#0177fd] flex flex-row justify-center mr-[623px] gap-2 h-10 items-center pl-5 pr-4 py-2 rounded-lg">
    <AddIcon
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="whitespace-nowrap font-['Inter'] font-medium capitalize text-white w-3/4">
      Add new task
    </div>
  </div>
  <img
    src="https://file.rendit.io/n/WIfK0bRvMufhZ68rAphi.svg"
    className="min-h-0 min-w-0 w-6 shrink-0"
  />
  <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-10 shrink-0">
    Filter
  </div>
  <img
    src="https://file.rendit.io/n/ZD0l5vAb6J8b3IzxWhWj.svg"
    className="min-h-0 min-w-0 w-6 shrink-0"
  />
  <div className="font-['Inter'] font-medium capitalize text-[#89898a] mr-4 w-8 shrink-0">
    Sort
  </div>
</div>
    )
}

export default AddNewTask