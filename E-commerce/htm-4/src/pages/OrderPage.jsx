import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axiosInstance from "../api/axiosInstance";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = ["Address", "Order Summary", "Payment"];

  // 🆕 Auto Fetch Address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get("/orders/get-address");
        const userAddress = response.data.address;

        if (userAddress) {
          setAddress(userAddress);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1 && Object.values(address).some((field) => field.trim() === "")) {
      return alert("Please fill all address fields.");
    }
    if (currentStep === 2 && !product) {
      return alert("No product selected for order.");
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      return alert("Please select a payment method.");
    }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/orders/create", {
        products: [{
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: 1,
        }],
        address,
        paymentMethod,
      });

      if (response.data.success) {
        navigate("/orderList", { state: { message: "Order placed successfully!" } });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Timeline */}
          <div className="flex justify-between items-center relative">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex items-center justify-center relative">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white transition-all duration-300
                  ${currentStep > index ? "bg-green-500" : currentStep === index + 1 ? "bg-green-400" : "bg-gray-300"}`}>
                  {index + 1}
                </div>
                {index !== steps.length - 1 && (
                  <div className={`absolute top-1/2 left-full w-full h-1 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"} transition-all`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white p-8 rounded-2xl shadow-md space-y-8">

            {currentStep === 1 && (
              <>
                <h2 className="text-2xl font-bold text-green-600">1. Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["fullName", "phone", "street", "city", "state", "pincode"].map((field) => (
                    <div key={field} className="relative">
                      <input
                        type={field === "phone" || field === "pincode" ? "number" : "text"}
                        name={field}
                        value={address[field]}
                        onChange={handleAddressChange}
                        placeholder=" "
                        className="peer w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 pt-4 pb-2 
                                   focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:shadow-md outline-none transition-all"
                      />
                      <label
                        className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 
                                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                      >
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-2xl font-bold text-green-600">2. Order Summary</h2>
                {product ? (
                  <div className="flex items-center space-x-6 border-b pb-4">
                    <img src={product.image[0]} alt={product.title} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{product.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">₹{product.price} /kg</p>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      ₹{product.price}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No product selected.</p>
                )}
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-2xl font-bold text-green-600">3. Payment Method</h2>
                <div className="space-y-4">
                  {["Cash on Delivery", "UPI", "Credit/Debit Card"].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-green-600 w-5 h-5"
                      />
                      <span className="text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-4">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold transition-all"
              >
                Back
              </button>
            )}
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="ml-auto px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`ml-auto px-6 py-2 rounded-xl ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white font-semibold transition-all`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
