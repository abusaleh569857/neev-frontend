// import React, { useState } from "react";
// import {
//   FaTachometerAlt,
//   FaBox,
//   FaUsers,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAuth } from "../Context/AuthContext";

// const menu = [
//   { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
//   { name: "Products", path: "/admin/products", icon: <FaBox /> },
//   { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
//   { name: "Users", path: "/admin/users", icon: <FaUsers /> },
// ];

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const handleLogout = () => {
//     logout();

//     Swal.fire({
//       icon: "success",
//       title: "সফলভাবে লগআউট হয়েছে",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen font-sans bg-gray-50">
//       {/* Mobile Header */}
//       <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
//         <button onClick={toggleSidebar} aria-label="Toggle menu">
//           {sidebarOpen ? (
//             <FaTimes className="text-[#ff003c] w-6 h-6" />
//           ) : (
//             <FaBars className="text-[#ff003c] w-6 h-6" />
//           )}
//         </button>
//         <h1 className="text-xl font-bold text-[#ff003c]">Admin Panel</h1>
//         <div className="w-6 h-6" /> {/* Placeholder for spacing */}
//       </header>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 border border-gray-300 shadow-md
//           transform transition-transform duration-300 ease-in-out
//           ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 md:static md:shadow-none`}
//       >
//         <div className="flex flex-col h-full p-6">
//           <h2 className="text-2xl font-bold text-[#ff003c] mb-8 text-center">
//             Admin Panel
//           </h2>

//           <nav className="flex flex-col space-y-2 flex-grow">
//             {menu.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center space-x-3 rounded-md px-4 py-2 text-gray-700 hover:bg-[#ff003c] hover:text-white transition-colors ${
//                     isActive ? "bg-[#ff003c] text-white" : ""
//                   }`
//                 }
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="font-medium">{item.name}</span>
//               </NavLink>
//             ))}
//           </nav>

//           <button
//             className="mt-auto flex items-center space-x-3 rounded-md px-4 py-2 text-gray-700 hover:bg-[#ff003c] hover:text-white transition-colors"
//             onClick={handleLogout}
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  { name: "Products", path: "/admin/products", icon: <FaBox /> },
  { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
  { name: "Users", path: "/admin/users", icon: <FaUsers /> },
];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    Swal.fire({
      icon: "success",
      title: "সফলভাবে লগআউট হয়েছে",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar for Desktop Only */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-100 border-r border-gray-300 shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#ff003c] mb-8 text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-2 flex-grow">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-md px-4 py-2 text-gray-700 hover:bg-[#ff003c] hover:text-white transition-colors ${
                  isActive ? "bg-[#ff003c] text-white" : ""
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          className="mt-auto flex items-center space-x-3 rounded-md px-4 py-2 text-gray-700 hover:bg-[#ff003c] hover:text-white transition-colors"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
    </div>
  );
};

export default AdminDashboard;
