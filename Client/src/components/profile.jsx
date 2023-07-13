import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import avatar from "../assets/avatar.avif"

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    role: 'Web developer',
    email: 'john.doe@example.com',
    About: `tell us more about yourself`,
    skills: 'briefly explain your skills',
    Adress: "124 Nairobi",
    Phone: "+254123456"

    // Add more profile data fields as needed
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Perform save/update logic here
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
              <h2 className="text-lg font-semibold text-gray-800">Name</h2>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                name="name"
                value={profileData.name}
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
                value={profileData.Phone}
                onChange={handleInputChange}
              />
              <h2 className="text-lg font-semibold text-gray-800">Adress</h2>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={profileData.Adress}
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
              value={profileData.skills}
              onChange={handleInputChange}
            ></textarea>
              
  
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
              <p className="text-gray-600">{profileData.role}</p>
              <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <p className="text-gray-600">{profileData.About}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <p className="text-gray-600">{profileData.skills}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800">Contact</h2>
            <p className="text-gray-600">
              Email: {profileData.email}
              <br />
              Phone: {profileData.Phone}
              <br />
              Address: {profileData.Adress}
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
