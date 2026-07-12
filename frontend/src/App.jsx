import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import NewDevice from "../src/pages/AddNewDevice";
import { MUTED } from "./theme";

function Placeholder({ name }) {
  return (
    <div
      className="bg-white rounded-2xl p-8 flex items-center justify-center"
      style={{ border: "1px solid #E7E2CE", minHeight: 400, color: MUTED }}
    >
      {name} page goes here
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/new" element={<NewDevice />} />
          <Route path="/shared-equipment" element={<Placeholder name="Shared Equipment" />} />
          <Route path="/employees" element={<Placeholder name="Employees" />} />
          <Route path="/departments" element={<Placeholder name="Departments" />} />
          <Route path="/logs" element={<Placeholder name="Activity Logs" />} />
          <Route path="/settings" element={<Placeholder name="Settings" />} />
          <Route path="*" element={<Placeholder name="Not found" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}