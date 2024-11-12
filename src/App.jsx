import React, { useContext, useEffect, useState } from "react"; // Added useEffect and useState imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/dashboard/Overview";
import { userContext } from "./context/UserContext"; // Adjust path if needed
import EmployeeList from "./pages/EmpList";
import EmployeeEdit from "./pages/EmployeeEdit";
import CreateEmployee from "./pages/CreateEmployee";
import axios from "axios";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const {setUser } = useContext(userContext);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        if (!token) {
          throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get("http://localhost:4005/api/v1/user/user", {
          headers: {
            Authorization: `${token}`, // Ensure "Bearer" prefix for the token
          },
        });

        if (response.data.success) {
          setLoading(false);
          setUser(response.data.data); // Set user data from the response
          setAuth(true);
        }
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || err.message); // Handle error
        setAuth(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return auth ? children : <Navigate to="/" />;
};
function App() {
  const [error, setError] = useState(null);
  const { setAuthenticate, setUser } = useContext(userContext);




  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/empList"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/empEdit/:id"
          element={
            <PrivateRoute>
              <EmployeeEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/createEmp"
          element={
            <PrivateRoute>
              <CreateEmployee />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    {error && <p>Error: {error}</p>}
  </>
  );
}

export default App;
