import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const CreateEmployee = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    tel: "",
    position: "Manager",
    gender: "",
    qualifications: [],
    base64Image: null,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{4}$/.test(employee.id)) {
      newErrors.id = "Employee ID must be exactly 4 digits.";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(employee.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setEmployee({ ...employee, base64Image:reader.result.split(",")[1] });
        setImagePreview(reader.result); // Display image preview

        setBase64Image(reader.result.split(",")[1]); // Store Base64 string in state
      };
      
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (validateForm()) {

      
        const payload = {
          employeeId: employee.id,
          name: employee.name,
          email: employee.email,
          mobileNumber: employee.tel,
          designation: employee.position,
          gender: employee.gender,
          course: employee.qualifications[0],
          profilePic: employee.base64Image,
        };
      
      try {
        const token = window.localStorage.getItem("authToken");

        const response = await axios.post(
          "http://localhost:4005/api/v1/employee/add-employee",
          payload,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          console.log("Employee added successfully:", response.data.data);
          navigate("/empList");
        } else {
          setServerError(response.data.message || "Failed to add employee.");
        }
      } catch (error) {
        setServerError(error?.response?.data?.message || "Error adding employee.");
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
      {imagePreview && (
        <div className="mt-4">
          <p className="text-gray-700">Image Preview:</p>
          <img src={imagePreview} alt="Preview" className="mt-2 w-48 h-48 object-cover rounded-lg" />
        </div>
      )}
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
