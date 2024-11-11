import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/dashboard/Overview";
import { UserProvider } from "./context/UserContext"; // Adjust path if needed
import Stats from "./pages/dashboard/Stats";
import RecentAct from "./pages/dashboard/RecentAct";
import Settings from "./pages/dashboard/Settings";
import EmployeeList from "./pages/EmpList";
import EmployeeEdit from "./pages/EmployeeEdit";
import CreateEmployee from "./pages/CreateEmployee";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/Stats" element={<Stats />} />
          <Route path="/dashboard/RecentAct" element={<RecentAct />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/empList" element={<EmployeeList/>} />
          <Route path="/empEdit" element={<EmployeeEdit />} />
          <Route path="/createEmp" element={<CreateEmployee />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
