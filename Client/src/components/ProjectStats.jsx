const ProjectStats = () => {
    return (
<div className="border-solid border-[#eaeaea] bg-white flex flex-col gap-5 w-full h-[552px] px-8 py-10 border rounded">
  <div className="flex flex-row justify-between items-center mb-px mx-2">
    <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] w-24 shrink-0">
      Project stats
    </div>
    <img
      src="https://file.rendit.io/n/vnwu92aXNW312bRrNA2c.svg"
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
  </div>
  <div className="border-dashed border-[#bdbdbd] flex flex-row justify-center gap-3 h-16 shrink-0 items-center border rounded">
    <img
      src="https://file.rendit.io/n/H0fFaVe2fxp2ETM3VTq7.svg"
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] w-[273px] h-[30.74%]">
      Time remaining
    </div>
    <div className="text-center text-xs font-['Inter'] font-medium capitalize text-[#eb5757] w-4 shrink-0">
      4d
    </div>
  </div>
  <div className="border-dashed border-[#bdbdbd] flex flex-row justify-center gap-3 h-16 shrink-0 items-center border rounded">
    <img
      src="https://file.rendit.io/n/gD4FZQi2x8E0f6y6gyWO.svg"
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] w-[273px] h-[30.74%]">
      Created task
    </div>
    <div className="text-center text-xs font-['Inter'] font-medium capitalize text-[#219653] w-4 shrink-0">
      25
    </div>
  </div>
  <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
    <img
      src="https://file.rendit.io/n/keLOL9LkhSIoK7jlKcZ7.svg"
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] mr-px w-64 h-[30.74%]">
      Task in progress
    </div>
    <div className="text-center text-xs font-['Inter'] font-medium capitalize text-[#f2994a] w-4 shrink-0">
      12
    </div>
  </div>
  <div className="border-dashed border-[#bdbdbd] flex flex-row gap-3 h-16 shrink-0 items-center px-4 border rounded">
    <img
      src="https://file.rendit.io/n/iZ9RVXhNNa9sexgt7bex.svg"
      className="min-h-0 min-w-0 w-6 shrink-0"
    />
    <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] mr-1 w-64 h-[30.74%]">
      Upcoming tasks
    </div>
    <div className="text-center text-xs font-['Inter'] font-medium capitalize text-[#0177fd] w-2 shrink-0">
      5
    </div>
  </div>
  <div className="border-dashed border-[#bdbdbd] flex flex-col justify-center gap-3 h-20 shrink-0 px-4 border rounded">
    <div className="flex flex-row justify-between mr-4 items-center">
      <div className="text-xs font-['Inter'] font-medium capitalize text-[#1b1a17] w-[107px] shrink-0 h-full">
        Overall process
      </div>
      <div className="text-center text-xs font-['Inter'] font-medium capitalize text-[#0177fd] w-4 shrink-0">
        70
      </div>
    </div>
    <div className="bg-[#f1f2f6] flex flex-col mr-4 rounded">
      <div className="bg-[#0177fd] mr-20 h-1 shrink-0 rounded" />
    </div>
  </div>
</div>

    )
}

export default ProjectStats