// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // লগইন না করা ইউজারকে login page এ পাঠাবে
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // যদি admin-only route হয়, কিন্তু ইউজার admin না
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
