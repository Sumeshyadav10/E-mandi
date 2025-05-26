import axios from "axios";

const API_URL = "http://localhost:5000/api";

// const API_URL = "https://admin-panel-5rac.onrender.com/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const token = localStorage.getItem("token");

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (email, password) =>
  api.post("/users/login", { email, password });
export const register = (userData) => api.post("/users/register", userData);
export const logout = () => api.post("/users/logout");

// User APIs
export const getUsers = () => api.get("/users/all");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.patch(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Product APIs
export const getProducts = (page = 1, keyword = "") =>
  api.get(`/products?page=${page}&keyword=${keyword}`);
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => {
  const formData = new FormData();
  Object.keys(productData).forEach((key) => {
    if (key === "image01") {
      formData.append("image01", productData[key]);
    } else if (key === "image02") {
      formData.append("image02", productData[key]);
    } else if (key === "image03") {
      formData.append("image03", productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });
  return api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateProduct = (id, productData) => {
  const formData = new FormData();
  Object.keys(productData).forEach((key) => {
    if (key === "image01" && productData[key]) {
      formData.append("image01", productData[key]);
    } else if (key === "image02" && productData[key]) {
      formData.append("image02", productData[key]);
    } else if (key === "image03" && productData[key]) {
      formData.append("image03", productData[key]);
    } else {
      formData.append(key, productData[key]);
    }
  });
  return api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Order APIs
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
export const updateOrderToDelivered = (id) => api.put(`/orders/${id}/deliver`);

// Message APIs
export const getMessages = () => api.get("/messages");
export const getMessageById = (id) => api.get(`/messages/${id}`);
export const createMessage = (messageData) => {
  const formData = new FormData();
  Object.keys(messageData).forEach((key) => {
    if (key === "attachments") {
      messageData[key].forEach((file) => {
        formData.append("attachments", file);
      });
    } else {
      formData.append(key, messageData[key]);
    }
  });
  return api.post("/messages", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateMessage = (id, messageData) =>
  api.put(`/messages/${id}`, messageData);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
export const getUnreadCount = () => api.get("/messages/unread/count");

export const creatadmin = (adminData) => api.post("/users", adminData);
export const getsummary = (name, price, dimension, category) => api.post("/gemini/createsummary",{name, price, dimension, category})

export default api;
