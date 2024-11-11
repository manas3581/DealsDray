import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    tel: "",
    position: "Manager", // Default position
    gender: "",
    qualifications: [], // To hold checked qualifications
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validate Employee ID (must be 4 digits)
    if (!/^\d{4}$/.test(employee.id)) {
      newErrors.id = "Employee ID must be exactly 4 digits.";
    }

    // Validate Email
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(employee.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Mobile Number (must be 10 digits)
    if (!/^\d{10}$/.test(employee.tel)) {
      newErrors.tel = "Mobile number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEmployee((prevState) => ({
        ...prevState,
        qualifications: checked
          ? [...prevState.qualifications, value]
          : prevState.qualifications.filter((qual) => qual !== value),
      }));
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("id", employee.id);
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("tel", employee.tel);
      formData.append("position", employee.position);
      formData.append("gender", employee.gender);
      formData.append("qualifications", JSON.stringify(employee.qualifications)); // Send as JSON string
      if (employee.image) formData.append("image", employee.image);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/employees/add-employee`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          console.log("Employee added successfully:", response.data.data);
          navigate("/empList");
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-200 to-pink-300">
      <div className="flex-1 flex flex-col">
        <header className=" shadow-lg p-6 bg-pink-100">
          <Nav />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="mb-4">
              <h1 className="text-3xl font-semibold text-gray-700 text-center">Add New Employee</h1>
            </div>

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
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
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
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              {errors.tel && <p className="text-red-500 text-sm mt-1">{errors.tel}</p>}
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
                accept=".jpg, .png"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateEmployee;
