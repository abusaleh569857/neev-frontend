import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User, X, Truck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "/public/logo.png"; // Update path if needed

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Drop Shoulder", path: "/drop-shoulder" },
    { name: "Old Money Polo", path: "/old-money" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className="bg-white shadow w-full z-50 font-sans">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Mobile Left: Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleDrawer}>
              <Menu className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Mobile Center: Logo */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Mobile Right: Cart Icon */}
          <div className="md:hidden">
            <NavLink to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-black" />

              <span className="absolute -top-2 -right-2 bg-[#ff003c] text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            </NavLink>
          </div>

          {/* Desktop Header: Logo + Search + Icons */}
          <div className="hidden md:flex w-full justify-between items-center px-6">
            <div className="flex justify-center">
              <img src={logo} alt="Logo" className="h-12" />
            </div>

            <div className="flex w-full max-w-xl border border-[#ff003c] rounded-md overflow-hidden bg-gray-100 mx-6">
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
              />
              <button className="bg-[#ff003c] px-4 py-2 flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <NavLink
                to="/track"
                className="flex items-center text-black hover:text-[#ff003c]"
              >
                <Truck className="w-5 h-5 mr-1" />
                Track Order
              </NavLink>

              <NavLink
                to="/login"
                className="flex items-center space-x-1 hover:text-[#ff003c]"
              >
                <User className="h-5 w-5" />
                <span>Login / Sign Up</span>
              </NavLink>

              <NavLink to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-black" />

                <span className="absolute -top-2 -right-2 bg-[#ff003c] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Search Bar Below Navbar for Mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full border border-[#ff003c] rounded-md overflow-hidden bg-gray-100">
            <input
              type="text"
              placeholder="Search Product..."
              className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none text-sm"
            />
            <button className="bg-[#ff003c] px-4 py-2 flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-4 pl-3">
                {navLinks.map((link) => {
                  let icon;
                  switch (link.name) {
                    case "Home":
                      icon = <span className="mr-2">🏠</span>;
                      break;
                    case "Shop":
                      icon = <span className="mr-2">🛍️</span>;
                      break;
                    case "Drop Shoulder":
                      icon = <span className="mr-2">👕</span>;
                      break;
                    case "Old Money Polo":
                      icon = <span className="mr-2">🧥</span>;
                      break;
                    case "About":
                      icon = <span className="mr-2">ℹ️</span>;
                      break;
                    default:
                      icon = <span className="mr-2">🔗</span>;
                  }

                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={toggleDrawer}
                      className="flex items-center text-gray-700 hover:text-black"
                    >
                      {icon}
                      {link.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
