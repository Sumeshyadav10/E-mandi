import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import HelpPage from "./pages/helpPage";
import SendMessagePage from "./pages/SendMessage";
import CategoryPage from "./components/productCard/categoryPages";
import AllProductsPage from "./pages/allproducts/Allproducts";
import OrderPage from "./pages/OrderPage";
import OrderListPage from "./pages/OrderListPage";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
    <AuthProvider>
      <MyState>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div className="relative z-0 bg-transparent">
                  <Home />

                </div>
              }
            />
            <Route path="/allproducts" element={<AllProductsPage />} />
            <Route path="/orderList" element={<OrderListPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/send-message" element={<SendMessagePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/Buy-product" element={<OrderPage />} />

            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;
