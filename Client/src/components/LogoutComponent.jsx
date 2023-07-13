import React, { useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const LogoutButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Perform logout action here
    // Example: dispatch a logout action or clear user session
    console.log('Logging out...');
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <>
      {showConfirmation ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={toggleConfirmation}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <MenuItem icon={<LogoutOutlinedIcon />} onClick={toggleConfirmation}>
          Logout
        </MenuItem>
      )}
    </>
  );
};

export default LogoutButton;
