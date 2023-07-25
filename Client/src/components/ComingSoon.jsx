import Logo from "../assets/tasklogo.png"
import AddNewTask from "./AddNewTaskButton";

const ComingSoon = () => {
    return (
        <>
        <AddNewTask/>
        <div className="pt-6 flex items-center justify-center ">
      <div className="max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-semibold text-center mb-4 text-gray-800">
          Coming Soon
        </h1>
        <p className="text-gray-600 text-center">
          I am working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="mt-6 flex justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-[150px] h-[150px] rounded-full border-4 border-white shadow"
          />
        </div>
      </div>
    </div>   
    </>
      );
    };

export default ComingSoon