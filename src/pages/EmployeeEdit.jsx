import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios"; // Make sure to install axios with `npm install axios`

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    tel: "",
    position: "Manager",
    gender: "",
    qualifications: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Fetch employee data from backend
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "qualifications") {
      setEmployee((prevState) => {
        const updatedQualifications = prevState.qualifications.includes(value)
          ? prevState.qualifications.filter((q) => q !== value)
          : [...prevState.qualifications, value];
        return { ...prevState, qualifications: updatedQualifications };
      });
    } else if (type === "file") {
      setEmployee({ ...employee, image: e.target.files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\d{4}$/.test(employee.id)) {
      newErrors.id = "Employee ID must be exactly 4 digits.";
    }
    if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!/^\d{10}$/.test(employee.tel)) {
      newErrors.tel = "Mobile number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append("id", employee.id);
        formData.append("name", employee.name);
        formData.append("email", employee.email);
        formData.append("tel", employee.tel);
        formData.append("position", employee.position);
        formData.append("gender", employee.gender);
        formData.append("qualifications", JSON.stringify(employee.qualifications));
        if (employee.image) formData.append("image", employee.image);

        await axios.put(`http://localhost:5000/api/employees/update-employee/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Employee updated successfully");
        navigate("/empList");
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-pink-300">
      <header className="bg-pink-100 shadow-lg p-6">
        <Nav />
      </header>

      <div className="flex justify-center items-center">
        <div className="w-full mx-3 max-w-3xl my-8 bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-semibold text-gray-700 mb-6">Edit Employee</h1>
            
            {/* Employee ID Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Employee ID</label>
              <input
                type="text"
                name="id"
                value={employee.id}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            {/* Mobile Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Mobile No</label>
              <input
                type="tel"
                name="tel"
                value={employee.tel}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {errors.tel && <p className="text-red-500">{errors.tel}</p>}
            </div>

            {/* Position Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Designation</label>
              <select
                name="position"
                value={employee.position}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Gender</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={employee.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={employee.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="others"
                    checked={employee.gender === "others"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Others
                </label>
              </div>
            </div>

            {/* Qualifications Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Qualifications</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="MCA"
                    checked={employee.qualifications.includes("MCA")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="BCA"
                    checked={employee.qualifications.includes("BCA")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="BSC"
                    checked={employee.qualifications.includes("BSC")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  BSC
                </label>
              </div>
            </div>

            {/* Image Upload Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image Upload</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
