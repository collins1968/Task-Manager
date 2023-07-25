import AllTaskSingle from "./AllTaskSingle"

export const AllTaskColumn1 = () => {
  return (
    <div className="bg-white flex flex-row justify-around pt-8  items-start rounded">
    <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
      <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
        Open{" "}
      </div>
      <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
        (4)
      </div>
    </div>
    <AllTaskSingle />
    <AllTaskSingle />
    <AllTaskSingle />
        </div>
        <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
      <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
        in Progress{" "}
      </div>
      <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
        (4)
      </div>
    </div>
    <AllTaskSingle />
    <AllTaskSingle />
    <AllTaskSingle />
        </div>
        <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
      <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
        Completed{" "}
      </div>
      <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
        (4)
      </div>
    </div>
    <AllTaskSingle />
    <AllTaskSingle />
    <AllTaskSingle />
        </div>
        <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
      <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
        Overdue{" "}
      </div>
      <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
        (4)
      </div>
    </div>
    <AllTaskSingle />
    <AllTaskSingle />
    <AllTaskSingle />
        </div>
        </div>
  )
}

export default AllTaskColumn1;
