// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ LocalStorage থেকে ইউজার লোড
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // ✅ ইউজার পরিবর্তন হলে localStorage এ সেভ
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Login Function
  const login = async (number, password) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        number,
        password,
      });

      setUser(res.data.user); // server থেকে আসা user object
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || "লগইন ব্যর্থ হয়েছে",
      };
    }
  };

  // ✅ Register Function
  const register = async (name, number, password) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        number,
        password,
      });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        message: err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
      };
    }
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
