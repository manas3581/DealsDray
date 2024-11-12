import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { userContext } from "../context/UserContext"; // Ensure this import is correct
import logimg from "../utils/logimg.png";
import logo_B2R from "../utils/logo_B2R.png";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthenticate, setUser } = useContext(userContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "", custom: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError({ email: "", password: "", custom: "" });

    if (!email) return setError((prev) => ({ ...prev, email: "Email is required" }));
    if (!emailRegex.test(email)) return setError((prev) => ({ ...prev, email: "Invalid email format" }));
    if (!password) return setError((prev) => ({ ...prev, password: "Password is required" }));
    if (!passwordRegex.test(password)) {
      return setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      }));
    }

    try {
      const res = await axios.post(
        `http://localhost:4005/api/v1/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (res.data.success) {
        const { token, user } = res.data.data.token;
        localStorage.setItem("authToken", token);  // Store the token in localStorage
        setUser(user);  // Set user data in context
        setAuthenticate(true);  // Update authentication status in context
        navigate("/dashboard");  // Redirect to dashboard
      }
    } catch (error) {
      setError((prev) => ({ ...prev, custom: error?.response?.data?.message || "Login failed" }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-200 to-pink-300">
      <div className="absolute top-4 left-4">
        <img src={logo_B2R} alt="Logo" className="w-24 h-24" />
      </div>
      
      <div className="flex flex-row max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="w-1/2 relative">
          <img src={logimg} alt="Login illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-bold text-yellow-300 text-center">Welcome To DealsDray</h1>
            <img src={logo_B2R} alt="Logo" className="w-32 h-32" />
          </div>
        </div>

        <div className="w-1/2 p-8 flex items-center">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    error.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      error.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
                {(error.password || error.custom) && (
                  <p className="text-red-500 text-sm mt-1">{error.password || error.custom}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
