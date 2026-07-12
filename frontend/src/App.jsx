import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

// Composition root — owns "which page is active" and hands it to Layout
// as children. Swap the useState below for React Router once you have
// real routes; Layout and each page don't need to change either way.

function Placeholder({ name }) {
  return (
    <div
      className="bg-white rounded-2xl p-8 flex items-center justify-center"
      style={{ border: "1px solid #E7EBF0", minHeight: 400, color: "#94A3B8" }}
    >
      {name} page goes here
    </div>
  );
}

export default function App() {
  const [page] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    devices: <Placeholder name="Devices" />,
    shared: <Placeholder name="Shared Equipment" />,
    employees: <Placeholder name="Employees" />,
    departments: <Placeholder name="Departments" />,
    logs: <Placeholder name="Activity Logs" />,
    settings: <Placeholder name="Settings" />,
  };

  return <Layout>{pages[page] ?? <Dashboard />}</Layout>;
}