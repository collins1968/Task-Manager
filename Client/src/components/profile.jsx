import React, { useContext, useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import avatar from "../assets/avatar.avif"
import {Context} from "../context/userContext/context"
import {apiUrl} from "../utils/utils"
import axios from "axios"
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const {user, dispatch} = useContext(Context)
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    email: user.email,
    About: `tell us more about yourself`,
    Skills: 'briefly explain your skills',
    Address: "124 Nairobi",
    phone: "+254123456"    
  });

  // useEffect(() => {
  //   // Save profileData to local storage whenever it changes
  //   localStorage.setItem('profileData', JSON.stringify(profileData));
  // }, [profileData]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsEditMode(false);
       // Add token and userId properties from user context to profileData
       const updatedProfileData = {
        ...profileData,
        token: user.token,
        userId: user.userId,
      };
      // Perform save/update logic here
      const response = await axios.put(`${apiUrl}/user`, updatedProfileData, { headers: { token: `${user.token}` } });
      if (!response.data) {
        throw new Error('Error updating user');
      }
      dispatch({ type: 'SET_USER', payload: updatedProfileData });
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-200 h-32">
          <img
            className="h-16 w-16 rounded-full ml-4"
            src={avatar}
            alt="Profile"
          />
          {isEditMode ? (
            <button
              className="text-gray-600 mr-4"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <EditOutlinedIcon
              className="text-gray-600 mr-4 cursor-pointer"
              onClick={handleEditClick}
            />
          )}
        </div>
        <div className="py-4 px-6">
          {isEditMode ? (
            <div className='mt-4'>
              <h2 className="text-lg font-semibold text-gray-800">First Name</h2>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="first_name"
                value={profileData.first_name}
                onChange={handleInputChange}
              />
              <h2 className="text-lg font-semibold text-gray-800">Last Name</h2>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="last_name"
                value={profileData.last_name}
                onChange={handleInputChange}
              />
              <h2 className="text-lg font-semibold text-gray-800">Role</h2>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="role"
                value={profileData.role}
                onChange={handleInputChange}
              />

              <h2 className="text-lg font-semibold text-gray-800">email</h2>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
              <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={profileData.phone}
                onChange={handleInputChange}
              />
              <h2 className="text-lg font-semibold text-gray-800">Adress</h2>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={profileData.Address}
                onChange={handleInputChange}
              />
              
              <h2 className="text-lg font-semibold text-gray-800">About</h2>
              <textarea
                className="w-full h-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="About"
                value={profileData.About}
                onChange={handleInputChange}
                placeholder='tell us more about yourself'
              />
              <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              value={profileData.Skills}
              onChange={handleInputChange}
            ></textarea>
              
  
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profileData.first_name + " " + profileData.last_name}</h1>
              <p className="text-gray-600">{profileData.role}</p>
              <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <p className="text-gray-600">{profileData.About}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <p className="text-gray-600">{profileData.Skills}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
            <p className="text-gray-600">
              Email: {profileData.email}
              <br />
              Phone: {profileData.phone}
              <br />
              Address: {profileData.Address}
            </p>
          </div> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
