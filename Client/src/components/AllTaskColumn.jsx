import AllTaskSingle from "./AllTaskSingle"
export const AllTaskColumn = () => {
  return (
    <div className="flex flex-col mb-24 gap-3">
        <div className="flex flex-row justify-evenly items-center mb-px mx-px">
      <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-10 shrink-0">
        To do{" "}
      </div>
      <div className="text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-5 shrink-0">
        (4)
      </div>
    </div>
    <AllTaskSingle />
    <AllTaskSingle />
    <AllTaskSingle />

        </div>
  )
}

export default AllTaskColumn;
