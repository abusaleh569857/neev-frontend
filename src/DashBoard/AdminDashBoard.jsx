import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700"
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
          <button className="flex items-center space-x-3 p-2 rounded hover:bg-red-600 mt-6 w-full">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="mt-2">Manage products, orders, and users here.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
