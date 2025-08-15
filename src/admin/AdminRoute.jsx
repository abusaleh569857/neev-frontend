import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Login না থাকলে login page এ পাঠাবে
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged-in কিন্তু admin না হলে home page এ পাঠাবে
    return <Navigate to="/" replace />;
  }

  // Admin হলে child routes render হবে
  return <Outlet />;
};

export default AdminRoute;
