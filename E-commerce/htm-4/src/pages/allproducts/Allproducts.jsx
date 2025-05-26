import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Loader2 } from "lucide-react";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products); // because your backend sends { products, page, pages }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-green-700 capitalize">
            All Products
          </h1>
          <div className="mt-2 h-1 w-24 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader2 className="animate-spin w-10 h-10 text-green-600" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => window.location.href = `/productinfo/${product._id}`}
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-600 italic mt-1">{product.description}</p>

                  {/* Shelf Life */}
                  {product.dimensions && (
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold">Shelf Life:</span> {product.dimensions}
                    </p>
                  )}

                  {/* Price */}
                  <p className="text-green-600 font-bold text-md mt-2">
                    ₹{product.price} /kg
                  </p>

                  <button
                    onClick={() => console.log("Add to cart logic here")}
                    className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
