import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-1-fkpy.onrender.com/api", // your backend API base
  withCredentials: true, // if using cookies/sessions
});

export default axiosInstance;
