import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Layout from "../components/layout/Layout";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/orders/my");
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order
  const handleCancelOrder = async (orderID) => {
    try {
      const { data } = await axiosInstance.delete(`/orders/cancel/${orderID}`);
      alert(data.message); // Show success message
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error("Error canceling order:", error);
      alert(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center text-xl">Loading orders...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-green-700">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">You have no orders yet.</div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-xl shadow-md space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        Order ID: <span className="text-green-600">{order.orderID}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className={`font-semibold ${order.status === "Canceled" ? "text-red-600" : "text-green-700"}`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="font-semibold mb-2">Shipping Address:</p>
                      <p>{order.address.fullName}</p>
                      <p>{order.address.phone}</p>
                      <p>
                        {order.address.street}, {order.address.city}
                      </p>
                      <p>
                        {order.address.state} - {order.address.pincode}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Products:</p>
                      {order.products.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.productId.image}
                              alt={item.productId.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <span>{item.productId.name}</span>
                          </div>
                          <span>
                            ₹{item.price} x {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right text-gray-800 font-semibold">
                    Payment Mode: {order.paymentMethod}
                  </div>

                  {/* Cancel Order Button */}
                  {order.status !== "Canceled" && (
                    <div className="text-right">
                     <button
                        onClick={() => handleCancelOrder(order.orderID)} // Use `orderID` instead of `_id`
                        className="mt-4 py-2 px-4 bg-red-600 text-white hover:bg-red-700 font-semibold rounded-lg transition-colors"
                        >
                        Cancel Order
                        </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderListPage;