// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-1-fkpy.onrender.com/api", // <-- Change this to your backend URL
  withCredentials: true, // Important if you use cookies/session auth
});

export default axiosInstance;
