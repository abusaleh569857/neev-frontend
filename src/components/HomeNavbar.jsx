import { NavLink } from "react-router-dom";
import { FaBars, FaWhatsapp, FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { useCart } from "../context/CartContext";

const HomeNavBar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">
      <div className="flex justify-around items-center h-16 relative px-3 border">
        <NavLink
          to="/drop-shoulder"
          className="flex flex-col items-center text-xs text-black hover:text-[#ff003c] space-y-1"
        >
          <FaBars className="text-lg" />
          <span>Category</span>
        </NavLink>

        <a
          href="https://wa.me/8801837569857"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-xs text-black hover:text-[#ff003c] space-y-1 pr-10"
        >
          <FaWhatsapp className="text-lg text-green-500" />
          <span>Whatsapp</span>
        </a>

        <NavLink
          to="/"
          className="absolute -top-6 left-48 bg-[#ff003c] text-white rounded-full w-[64px] h-[64px] border-2 border-gray-300 shadow-lg flex flex-col items-center justify-center text-xs hover:bg-[#e60033]"
        >
          <TiHome className="text-2xl" />
          <span className="pb-1">Home</span>
        </NavLink>

        <NavLink
          to="/cart"
          className="flex flex-col items-center text-xs text-black hover:text-[#ff003c] space-y-1"
        >
          <IoCart className="text-lg" />
          <span>Cart ({cartCount})</span>
        </NavLink>

        <NavLink
          to="/login"
          className="flex flex-col items-center text-xs text-black hover:text-[#ff003c] space-y-1"
        >
          <FaUser className="text-lg" />
          <span>Login</span>
        </NavLink>
      </div>
    </div>
  );
};

export default HomeNavBar;
