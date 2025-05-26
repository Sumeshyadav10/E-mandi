import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { XCircle } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleBuyNow = (item) => {
    navigate("/Buy-product", { state: { product: item } }); // Pass product details to the OrderPage
  };

  return (
    <Layout>
      <div className="min-h-screen pt-24 bg-[#f9fafb] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800">Your Cart</h1>
            <p className="text-gray-500 mt-2">Review your selected items</p>
          </div>

          {/* Cart Content */}
          {cartItems.length === 0 ? (
            <div className="text-center text-lg text-gray-600">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Info Left */}
                  <div className="flex items-center space-x-5">
                    <div
                      className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(item.category)}
                    >
                      <img
                        src={item.image[0]}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h2
                        className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
                        onClick={() => handleProductClick(item.category)}
                      >
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        Category: {item.category}
                      </p>
                      <p className="text-green-600 font-bold mt-2 text-md">
                        ₹{item.price} /kg
                      </p>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-col items-center mt-6 sm:mt-0 space-y-3">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center justify-center w-32 py-2 px-4 bg-red-100 text-red-600 hover:bg-red-200 font-semibold rounded-lg transition-colors"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Remove
                    </button>

                    <button
                      onClick={() => handleBuyNow(item)}
                      className="w-32 py-2 px-4 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
