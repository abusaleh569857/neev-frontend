import { useState } from "react";
import { FaLock, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(mobile, password);

    if (res.success) {
      alert("✅ লগইন সফল হয়েছে");
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-md shadow-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-4">কাস্টমার লগিন</h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 text-sm p-2 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">মোবাইল নাম্বার</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff003c]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff003c]"
              required
            />
          </div>

          <div className="text-sm flex items-center gap-2 cursor-pointer hover:text-[#ff003c] transition">
            <FaLock size={14} />
            <span>পাসওয়ার্ড ভুলে গেছেন?</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff003c] text-white font-bold py-2 rounded-md hover:bg-[#e00036] transition"
          >
            লগিন
          </button>

          <div className="text-center text-sm">
            <p>একাউন্ট না থাকলে?</p>
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="mt-1 w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 transition"
            >
              <FaPen size={14} />
              <span>রেজিস্ট্রেশন করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
