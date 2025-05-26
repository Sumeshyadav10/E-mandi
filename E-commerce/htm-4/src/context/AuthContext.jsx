import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true);

  // Fetch user data on initial load

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/users/me"); // Adjust endpoint as needed
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      await axiosInstance.post("/users/login", credentials);
      await fetchUser(); // Fetch user data after login
      console.log("Logged in successfully");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed!");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setUser(null); // Clear user data
      console.log("Logged out successfully");
      toast.success("Logout successful!"); // Show success notification
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed!"); // Show error notification
      setUser(null); // Still log out client-side even if server fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
