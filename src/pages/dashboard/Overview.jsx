import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav"; // Adjust the path based on your folder structure

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-200 to-pink-300">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-pink-100 shadow-lg p-6">
          <Nav />
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div>
            <h1 className="text-3xl font-semibold text-center text-gray-700">Dashboard</h1>
          </div>

          {/* Overview Section */}
          <section id="overview" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Total Users Card */}
              <div
                onClick={() => navigate('/empList')}
                className="bg-white p-6 rounded-xl shadow-xl cursor-pointer hover:bg-indigo-50 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-indigo-600">1200</p>
              </div>

              {/* Create Employee Card */}
              <div
                onClick={() => navigate('/createEmp')}
                className="bg-white p-6 rounded-xl shadow-xl cursor-pointer hover:bg-indigo-50 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Create Employee</h3>
                <p className="text-3xl font-bold text-indigo-600">450</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
