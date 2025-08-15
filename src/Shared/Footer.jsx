import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "/public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#ff003c] text-white pt-10 mb-20 md:mb-2 font-sans">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-start md:items-center">
          <img src={logo} alt="Neev Logo" className="w-20 h-20 mb-2" />
          <p className="text-white/90 text-center md:text-left">
            Bringing exclusive fashion to your doorstep.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-start md:items-center">
          <h3 className="text-lg font-semibold mb-3 text-white pr-0 md:pr-6">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-white/80 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/drop-shoulder"
                className="hover:text-white/80 transition-colors duration-300 font-medium"
              >
                DropShoulder
              </Link>
            </li>
            <li>
              <Link
                to="/old-money"
                className="hover:text-white/80 transition-colors duration-300 font-medium"
              >
                Old Money Polo
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <a
            href="https://wa.me/8801837569857"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium hover:text-white/80 transition-colors duration-300"
          >
            <FaWhatsapp className="text-green-500" /> +8801837569857
          </a>
          <p className="font-medium">Email: neevclothing.info@gmail.com</p>
          <p className="mt-2 font-medium">
            Office: 100 Feet Road, Sayednagar, Vatara, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/30 mt-10 pt-4 pb-6 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} Neev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
