const TodaysTasks = () => {
    return (
        <div className="relative flex flex-col ml-2 mr-1">
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] absolute top-4 left-3 h-4 w-16">
          Start from
        </div>
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#89898a] absolute top-10 left-3 h-4 w-12">
          9.00 am
        </div>
        <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] absolute top-4 left-[141px] h-4 w-10">
          Design
        </div>
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#89898a] absolute top-10 left-[141px] h-4 w-[115px]">
          Prepare figma file
        </div>
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] absolute top-4 left-[318px] h-4 w-24">
          24% complete
        </div>
        <img
          src="https://file.rendit.io/n/AMly6HTtqzc1GIkKwzpr.svg"
          className="w-40 h-1 min-h-0 min-w-0 absolute top-10 left-[318px]"
        />
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] absolute top-4 left-[530px] h-4 w-20">
          Assigned to
        </div>
        <div className="whitespace-nowrap text-xs font-['Inter'] font-medium capitalize text-[#89898a] absolute top-10 left-[530px] h-4 w-20">
          ahmed nader
        </div>
        <div className="border-dashed border-[#bdbdbd] h-20 shrink-0 border rounded-lg" />
      </div>
    )
}

export default TodaysTasks;