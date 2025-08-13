// RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // reset error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, number, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError("পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না");
    }

    const res = await register(name, number, password);
    if (res.success) {
      alert("✅ রেজিস্ট্রেশন সফল হয়েছে!");
      navigate("/login");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 font-sans">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Title */}
        <div className="flex items-center justify-center mb-4">
          <FaUserPlus className="text-3xl text-[#ff003c] mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            রেজিস্ট্রেশন করুন
          </h2>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-center bg-red-100 text-red-700 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="আপনার নাম"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#ff003c] outline-none"
          />
          <input
            type="text"
            name="number"
            placeholder="মোবাইল নাম্বার"
            value={formData.number}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#ff003c] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="পাসওয়ার্ড"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#ff003c] outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="পাসওয়ার্ড নিশ্চিত করুন"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#ff003c] outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#ff003c] text-white py-2 rounded hover:bg-[#e60035] transition"
          >
            রেজিস্ট্রেশন করুন
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600 text-sm">
          রেজিস্ট্রেশন করা আছে?{" "}
          <Link
            to="/login"
            className="text-[#ff003c] font-semibold hover:underline"
          >
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
