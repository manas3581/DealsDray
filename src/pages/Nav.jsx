import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            User
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
