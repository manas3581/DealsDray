import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav"; // Adjust the path based on your folder structure
import axios from "axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Fetch total employees count from the backend
  const fetchTotalEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4005/api/v1/employee/get-employee-count`, // Add an endpoint for the count
        { headers: { "Content-Type": "application/json", authorization: localStorage.getItem("authToken") } }
      );
      if (res.data.success) {
        setTotalEmployees(res.data.count); // Assuming the backend response includes the count field
      }
    } catch (error) {
      console.error("Error fetching total employees:", error);
    }
  };

  useEffect(() => {
    fetchTotalEmployees();
  }, []);

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
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Employees</h3>
                {/* <p className="text-3xl font-bold text-indigo-600">{totalEmployees}</p> */}
              </div>

              {/* Create Employee Card */}
              <div
                onClick={() => navigate('/createEmp')}
                className="bg-white p-6 rounded-xl shadow-xl cursor-pointer hover:bg-indigo-50 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Create Employee</h3>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
