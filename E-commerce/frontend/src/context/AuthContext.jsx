import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, logout as logoutApi } from "../services/api";
import axiosInstance from "../api/axiosInstance"; // Adjust the import based on your project structure

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/users/login", credentials);
      setUser(response.data); // Update user state
      localStorage.setItem("user", JSON.stringify(response.data)); // Persist user data
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setUser(null); // Clear user data
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      setUser(null); // Still log out client-side even if server fails
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin" || user?.role === "superadmin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
