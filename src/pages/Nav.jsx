import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import logo_B2R from "../utils/logo_B2R.png";


const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { setAuthenticate, setUser,user } = useContext(userContext);


  // Function to clear the token and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token
    navigate('/'); // Redirect to login page or homepage
  };

  const navLinkClasses = (path) =>
    `hover:text-gray-600 cursor-pointer hover:underline hover:underline-offset-4 transition duration-200 ${
      location.pathname === path ? "text-indigo-600 underline" : ""
    }`;

  return (
    <div className="text-black p-1 shadow-sm">
      <nav className="flex justify-between text-xl font-semibold tracking-wide">
        {/* Left Side - Main Navigation */}
        <ul className="flex space-x-6">
          <li>
            <img
              src={logo_B2R}
              alt="Logo"
              className="h-11 w-11 object-cover"
            />
          </li>
          <li
            onClick={() => navigate('/dashboard')}
            className={navLinkClasses('/dashboard')}
          >
            Home
          </li>
          <li
            onClick={() => navigate('/empList')}
            className={navLinkClasses('/empList')}
          >
            Employee List
          </li>
        </ul>

        {/* Right Side - User Options */}
        <ul className="flex space-x-6">
          <li className="hover:text-gray-600 cursor-pointer hover:underline hover:underline-offset-4 transition duration-200">
            {user?.name}
          </li>
          <li
            onClick={handleLogout} // Call handleLogout on click
            className={navLinkClasses('/')}
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
