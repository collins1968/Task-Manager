import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import project from "../assets/project.png";
import "../styles/landingPage.css";

const LandingPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const toggleForm = () => {
      setIsLoginForm(!isLoginForm);
  };
  return (
      <>
      <div className="homepage">
           {/* <div className='image'>
              <img src={project} alt="libImage" />
              </div> */}
              {isLoginForm ? (
                  <Register onFormChange={toggleForm} />
              ) : (
                  <Login onFormChange={toggleForm} /> 
                  )}    
   </div>
      </>       
  )};


export default LandingPage;

