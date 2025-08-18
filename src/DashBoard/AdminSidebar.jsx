import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
  { name: "Products", path: "/admin/products", icon: <FaBox /> },
  { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
  { name: "Users", path: "/admin/users", icon: <FaUsers /> },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        onClick={onClose}
      />

      <div
        className="fixed top-0 left-0 h-full w-1/2 sm:w-1/2 md:w-1/3 bg-white z-50 shadow-md flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[#ff003c]">Admin Panel</h2>
          <button onClick={onClose}>
            <FaTimes className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-[#ff003c] hover:text-white ${
                  isActive ? "bg-[#ff003c] text-white" : ""
                }`
              }
              onClick={onClose}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 mt-auto p-4 text-gray-700 hover:bg-[#ff003c] hover:text-white"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
