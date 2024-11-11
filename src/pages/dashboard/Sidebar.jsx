import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8">DealsDray Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className="block py-2 px-4 rounded-lg hover:bg-indigo-100 text-gray-700">
          Overview
        </Link>
        <Link to="/dashboard/Stats" className="block py-2 px-4 rounded-lg hover:bg-indigo-100 text-gray-700">
          Stats
        </Link>
        <Link to="/dashboard/RecentAct" className="block py-2 px-4 rounded-lg hover:bg-indigo-100 text-gray-700">
          Recent Activity
        </Link>
        <Link to="/dashboard/settings" className="block py-2 px-4 rounded-lg hover:bg-indigo-100 text-gray-700">
          Settings
        </Link>
        <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-red-100 text-red-600">
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
