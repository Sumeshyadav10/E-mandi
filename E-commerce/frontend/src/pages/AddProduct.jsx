import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getsummary } from "../services/api";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    dimensions: "",
    category: "",
    stock: "",
    image01: null,
    image02: null,
    image03: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [imageField]: file,
    }));
  };

  const getSummaries = async () => {
    try {
      if (
        !formData.name ||
        !formData.dimensions ||
        !formData.price ||
        !formData.category
      ) {
        toast.error("Enter other details first");
        return;
      }

      const response = await getsummary(
        formData.name,
        formData.price,
        formData.dimensions,
        formData.category
      );
      console.log(response);
      setSummaries(response.data.summaries || []); // Assuming the backend response has a "summaries" array
      setFormData((prev) => ({
        ...prev,
        description: response.data.summary || "", // Assuming the backend response has a "summary"
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch summary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct(formData);
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        ADD PRODUCT
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name (required)
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price/Kg (required)
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (required)
              </label>
              <textarea
                name="description"
                required
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Get Summary Button */}
            <div>
              <button
                type="button"
                onClick={getSummaries}
                className="w-full mt-4 py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Get Summary
              </button>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Shelf-Life in Days (required)
              </label>
              <textarea
                name="dimensions"
                placeholder="Enter product Shelf-Life"
                value={formData.dimensions}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category (required)
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Pulses">Pulses</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains"> Grains</option>
                <option value="Other-Items">Other Items</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock in kgs (required)
              </label>
              <input
                type="number"
                name="stock"
                required
                placeholder="Enter product stock in kgs"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            {/* Image Uploads */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image 01 (required)
              </label>
              <input
                type="file"
                name="image01"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image01")}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                required
              />
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image 02
                </label>
                <input
                  type="file"
                  name="image02"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "image02")}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image 03
                </label>
                <input
                  type="file"
                  name="image03"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "image03")}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
