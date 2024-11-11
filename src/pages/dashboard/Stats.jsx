import React from "react";
import Sidebar from "./Sidebar"; // Adjust the path based on your folder structure

const Stats = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700">Stats</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Statistics or chart content goes here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
