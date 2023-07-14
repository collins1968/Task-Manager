const RecentActivity = () => {
    return (
        <div className="border-solid border-[#eaeaea] bg-white flex flex-col gap-4 h-[444px] shrink-0 p-8 border rounded">
        <div className="whitespace-nowrap text-sm font-['Inter'] font-semibold capitalize text-[#1b1a17] self-start w-[111px]">
          Recent activity
        </div>
        <div className="flex flex-row gap-1 items-center mb-4 mr-10">
          <img
            src="https://file.rendit.io/n/MetG3rf2wWIX1wlHgmjh.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] mr-1 w-56">
            Nader Mahrous.<div className="contents">Joined the project</div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-16 shrink-0">
            1days ago
          </div>
        </div>
        <div className="flex flex-row gap-1 items-start mb-4 mr-3">
          <img
            src="https://file.rendit.io/n/8MEfNAWfEDlwihoG6nJm.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] self-center w-64 mt-px mr-1">
            Nora Ashraf.
            <div className="contents">
              Assign a new task to you <br />( barkli home page)
            </div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] mt-px w-16 shrink-0">
            1days ago
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center mb-4 mr-16">
          <img
            src="https://file.rendit.io/n/QtU3Lkl8C8dQwi9boDnq.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] mr-1 w-48">
            Reem Galal.<div className="contents">Reported an issue</div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-16 shrink-0">
            2days ago
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center mb-4 mr-16">
          <img
            src="https://file.rendit.io/n/63gCbjCNQCcMwhz2WRRE.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] mr-1 w-48">
            Nader Elsayed.<div className="contents">Uploaded a file</div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-16 shrink-0">
            3days ago
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center mb-4 mr-16">
          <img
            src="https://file.rendit.io/n/xA6IOTY3zfSFKtkpL6AH.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] mr-1 w-48">
            Ahmed zizo.<div className="contents">Started new task</div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] w-16 shrink-0">
            4days ago
          </div>
        </div>
        <div className="flex flex-row mr-20 gap-1 items-start">
          <img
            src="https://file.rendit.io/n/MJ2B1Meoei0smp7mHaLS.svg"
            className="min-h-0 min-w-0 w-6 shrink-0"
          />
          <div className="whitespace-nowrap text-sm font-['Inter'] text-[#1b1a17] self-center w-48 mt-px mr-1">
            Ezz Elsayed.
            <div className="contents">
              Completed task
              <br />( barkli prototype)
            </div>
          </div>
          <div className="whitespace-nowrap text-xs font-['Inter'] text-[#89898a] mt-px w-16 shrink-0">
            5days ago
          </div>
        </div>
      </div>
    )
}

export default RecentActivity