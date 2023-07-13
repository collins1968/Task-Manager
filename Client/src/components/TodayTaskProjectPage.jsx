import TodaysTasks from "./TodaysTasks";

const TodayTaskProjectPage = () => {
    return (
        <div className="border-solid border-[#eaeaea] bg-white flex flex-col justify-end gap-4 w-full pt-8 pb-4 px-6 border rounded">
        <div className="flex flex-row justify-between items-center mb-1 ml-2">
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] w-20 shrink-0">
            Todays task
          </div>
          <img
            src="https://file.rendit.io/n/mrEgR1SsO4LUWXrdOvRO.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
        </div>
        <TodaysTasks />
        <TodaysTasks />
        <TodaysTasks />
        <TodaysTasks />
      </div>
    )
}

export default TodayTaskProjectPage;
