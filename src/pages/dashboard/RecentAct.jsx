import React from "react";
import Sidebar from "./Sidebar"; // Adjust the path based on your folder structure

const RecentAct = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700">Recent Activity</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="space-y-3">
              <li className="text-gray-700">
                <span className="font-bold">User A</span> logged in.
              </li>
              <li className="text-gray-700">
                <span className="font-bold">User B</span> updated profile.
              </li>
              <li className="text-gray-700">
                <span className="font-bold">User C</span> signed up.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecentAct;
