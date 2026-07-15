import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import './App.css';
import Devices from "./pages/Devices";
import NewDevice from "../src/pages/AddNewDevice";
import Employees from "./pages/Employees";
import { MUTED } from "./theme";
import Departments from "./pages/Departments";
import NotificationPanel from "./components/dashboard/NotificationPanel";
import NotificationsPage from "./pages/NotificationsPage";
import ActivityLogs from "./pages/Logs";
import SignIn from "./pages/SignIn";
import Profile from "./components/layout/ProfilePage";
import { AuthProvider } from "./components/authContexts/AuthContext";
import ProtectedRoute from "./components/authContexts/ProtectedRoute"; 
import NewEmployee from "./pages/AddNewEmployee";
import NewCategory from "./components/category/AddCategory";

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
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <Layout>
                  <Devices />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices/new"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <NewDevice />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <Employees />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/new"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <NewEmployee />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <Departments />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Layout>
                  <NewCategory />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Layout>
                  <ActivityLogs />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared-equipment"
            element={
              <ProtectedRoute>
                <Layout>
                  <Placeholder name="Shared Equipment" />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Placeholder name="Settings" />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Placeholder name="Not found" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}