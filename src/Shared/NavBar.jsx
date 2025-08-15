import React, { useState } from "react";
import {
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaUser,
  FaTruck,
  FaTachometerAlt,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../Context/AuthContext";
import logo from "/public/logo.png";
import AdminSidebar from "../DashBoard/AdminSidebar";
import { useNavigate } from "react-router-dom"; // <-- add this

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    logout(); // call logout from context
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Drop Shoulder", path: "/drop-shoulder" },
    { name: "Old Money Polo", path: "/old-money" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className="bg-white shadow w-full z-50 font-sans">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Mobile Left: Drawer Toggle */}
          <div className="md:hidden">
            <button onClick={toggleDrawer}>
              <FaBars className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Mobile Center: Logo */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Mobile Right: Cart Icon */}
          <div className="md:hidden">
            <NavLink to="/cart" className="relative">
              <FaShoppingCart className="h-6 w-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-[#ff003c] text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </NavLink>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex w-full justify-between items-center px-6">
            {/* Logo */}
            <div className="flex justify-center">
              <img src={logo} alt="Logo" className="h-12" />
            </div>

            {/* Search Bar */}
            <div className="flex w-full max-w-xl border border-[#ff003c] rounded-md overflow-hidden bg-gray-100 mx-6">
              {/* <input
                type="text"
                placeholder="Search Product..."
                className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
              /> */}
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm} // bind state
                onChange={(e) => setSearchTerm(e.target.value)} // update state
                className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(e); // Enter press এ search হবে
                }}
              />
              {/* 
              <button className="bg-[#ff003c] px-4 py-2 flex items-center justify-center">
                <FaSearch className="h-6 w-6 text-white" />
              </button> */}
              <button
                onClick={handleSearch} // button click এ search হবে
                className="bg-[#ff003c] px-4 py-2 flex items-center justify-center"
              >
                <FaSearch className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <NavLink
                to="/track"
                className="flex items-center text-black hover:text-[#ff003c]"
              >
                <FaTruck className="w-5 h-5 mr-1" />
                Track Order
              </NavLink>

              {/* Admin Link - Desktop */}
              {user && user.role === "admin" && (
                <button
                  onClick={() => setAdminSidebarOpen(true)}
                  className="flex items-center hover:text-[#ff003c]"
                >
                  <FaTachometerAlt className="h-5 w-5 mr-1" /> Admin Dashboard
                </button>
              )}

              {/* ✅ Logout for normal user (desktop) */}
              {user && user.role === "user" && (
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-[#ff003c]"
                >
                  <FaSignOutAlt className="h-5 w-5 mr-1" /> Logout
                </button>
              )}

              {!user && (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-1 hover:text-[#ff003c]"
                >
                  <FaUser className="h-5 w-5" />
                  <span>Login / Sign Up</span>
                </NavLink>
              )}

              <NavLink to="/cart" className="relative">
                <FaShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 bg-[#ff003c] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full border border-[#ff003c] rounded-md overflow-hidden bg-gray-100">
            <input
              type="text"
              placeholder="Search Product..."
              className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
            />
            <button className="bg-[#ff003c] px-4 py-2 flex items-center justify-center">
              <FaSearch className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex justify-center items-center bg-[#ff003c] px-8 py-3">
          <nav className="flex justify-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-white hover:text-[#7b2d14] font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 font-sans"
          onClick={toggleDrawer}
        >
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center p-3 mb-3 border-b">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <button onClick={toggleDrawer}>
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-4 pl-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={toggleDrawer}
                    className="flex items-center text-gray-700 hover:text-black"
                  >
                    {link.name === "Home" && <span className="mr-2">🏠</span>}
                    {link.name === "Shop" && <span className="mr-2">🛍️</span>}
                    {link.name === "Drop Shoulder" && (
                      <span className="mr-2">👕</span>
                    )}
                    {link.name === "Old Money Polo" && (
                      <span className="mr-2">🧥</span>
                    )}
                    {link.name === "About" && <span className="mr-2">ℹ️</span>}
                    {link.name}
                  </NavLink>
                ))}

                {/* Admin link in mobile drawer */}
                {user && user.role === "admin" && (
                  <button
                    onClick={() => {
                      toggleDrawer();
                      setAdminSidebarOpen(true);
                    }}
                    className="flex items-center text-gray-700 hover:text-black"
                  >
                    <FaTachometerAlt className="mr-2" /> Admin Dashboard
                  </button>
                )}

                {/* ✅ Logout for normal user (mobile) */}
                {user && user.role === "user" && (
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleDrawer();
                    }}
                    className="flex items-center text-gray-700 hover:text-black"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                )}

                {!user && (
                  <NavLink
                    to="/login"
                    onClick={toggleDrawer}
                    className="flex items-center text-gray-700 hover:text-black"
                  >
                    <FaUser className="mr-2" /> Login / Sign Up
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={adminSidebarOpen}
        onClose={() => setAdminSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;
