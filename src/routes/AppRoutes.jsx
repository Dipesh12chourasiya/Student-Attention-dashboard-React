import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Admin from "../pages/Admin";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import SessionDetails from "../pages/SessionDetails";

import AdminUserDetail from "../features/admin/AdminUserDetail";

import { useAuth } from "../hooks/useAuth";

// 🔐 Protected Route (login required)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-6">Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

// 🔥 Admin Route (login + role check)
const AdminRoute = ({ children }) => {
  const { user, userData, loading } = useAuth();

  if (loading) return <p className="p-6">Loading...</p>;

  // ❌ not logged in
  if (!user) return <Navigate to="/login" />;

  // ❌ not admin
  if (userData?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/*  Public */}
        <Route path="/login" element={<Login />} />

        {/*  Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/*  Session Details (protected) */}
        <Route
          path="/session/:sessionId"
          element={
            <ProtectedRoute>
              <SessionDetails />
            </ProtectedRoute>
          }
        />

        {/*  Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/user/:uid"
          element={
            <AdminRoute>
              <AdminUserDetail />
            </AdminRoute>
          }
        />

        {/*  Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;