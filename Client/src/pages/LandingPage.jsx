import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import project from "../assets/project.png";
import time from "../assets/time.png";
import react from "../assets/react.svg";
import "../styles/landingPage.css";

const LandingPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const toggleForm = () => {
      setIsLoginForm(!isLoginForm);
  };
  return (
      <>
<div className="flex h-screen">
  <div className="w-2/3 bg-white">
    <div className="h-full relative">
      <img className="h-[700px] w-[700px] object-cover" src={time} alt="libImage" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-bold text-black">Welcome to TaskPro</h1>
        <p className="text-2xl text-black mt-4">Manage your tasks efficiently</p>
      </div>
    </div>
  </div>
  <div className="w-1/3 bg-[#F1F2F6] flex justify-center items-center">
    {isLoginForm ? <Register onFormChange={toggleForm} /> : <Login onFormChange={toggleForm} />}
  </div>
</div>
      </>       
  )};


export default LandingPage;

