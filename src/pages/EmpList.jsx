import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch employees from the backend API
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4005/api/v1/employee/get-employee`,
        { 
          headers: { 
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken") 
          } 
        }
      );

      if (res.data.success) {
        setEmployees(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle edit button click to navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/empEdit/${id}`);
  };

  // Handle delete button click to delete an employee
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4005/api/v1/employee/delete-employee/${id}`,
        { 
          headers: { 
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken") 
          } 
        }
      );
      if (res.data.success) {
        fetchEmployees(); // Refresh the employee list after deletion
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter employees based on search term (ID or name)
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toString().includes(searchTerm)
  );

  return (
    <div className="h-screen bg-gradient-to-br from-pink-200 to-pink-300 overflow-x-scroll">
      <div className="flex-1 flex flex-col">
        <header className="shadow-lg p-6 bg-pink-100">
          <Nav />
        </header>
        <div className="flex p-2">
          <input
            type="text"
            placeholder="Search by ID or Name..."
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <button
            onClick={() => setSearchTerm("")} // Clear search input
            className="bg-indigo-500 text-white px-4 py-2 mx-2 rounded-lg hover:bg-indigo-600"
          >
            Clear
          </button>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h1 className="text-3xl font-semibold text-gray-700 text-center">Employee List</h1>
            </div>
            <div className="overflow-x-scroll">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700">
                    <th className="p-4 border-b text-left font-semibold">Employee ID</th>
                    <th className="p-4 border-b text-left font-semibold">Image</th>
                    <th className="p-4 border-b text-left font-semibold">Name</th>
                    <th className="p-4 border-b text-left font-semibold">Email</th>
                    <th className="p-4 border-b text-left font-semibold">Mobile No</th>
                    <th className="p-4 border-b text-left font-semibold">Designation</th>
                    <th className="p-4 border-b text-left font-semibold">Gender</th>
                    <th className="p-4 border-b text-left font-semibold">Course</th>
                    <th className="p-4 border-b text-left font-semibold">Create Date</th>
                    <th className="p-4 border-b text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.employeeId} className="hover:bg-gray-100">
                        <td className="p-4 border-b text-gray-700">{employee.employeeId}</td>
                        <td className="p-4 border-b text-gray-700">
                          <img
                            src={employee.profilePic ? `data:image/png;base64,${employee.profilePic}` : "/default-avatar.png"}
                            alt="Employee"
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td className="p-4 border-b text-gray-700">{employee.name}</td>
                        <td className="p-4 border-b text-gray-700">{employee.email}</td>
                        <td className="p-4 border-b text-gray-700">{employee.mobileNumber}</td>
                        <td className="p-4 border-b text-gray-700">{employee.designation}</td>
                        <td className="p-4 border-b text-gray-700">{employee.gender}</td>
                        <td className="p-4 border-b text-gray-700">{employee.course}</td>
                        <td className="p-4 border-b text-gray-700">{new Date(employee.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 border-b text-gray-700">
                          <button
                            onClick={() => handleEdit(employee._id)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center p-4 text-gray-700">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;
