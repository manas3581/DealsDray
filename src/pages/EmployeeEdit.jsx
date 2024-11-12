import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeEdit = () => {
  const { id } = useParams();  // Get employee ID from route parameter
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    name: "",
    email: "",
    mobileNumber: "",
    position: "",
    gender: "",
    course: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch employee data by ID
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4005/api/v1/employee/employee/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authToken"),
            },
          }
        );
        if (res.data.success) {
          setEmployeeData(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);

  // Handle input change for updating employee data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating employee data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4005/api/v1/employee/edit-employee/${id}`,
        employeeData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken"),
          },
        }
      );
      if (res.data.success) {
        navigate("/empList");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Edit Employee</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-600">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={employeeData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Position</label>
            <input
              type="text"
              name="position"
              value={employeeData.position}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Gender</label>
            <input
              type="text"
              name="gender"
              value={employeeData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Course</label>
            <input
              type="text"
              name="course"
              value={employeeData.course}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={(e) =>
                setEmployeeData({ ...employeeData, profilePic: e.target.files[0] })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
