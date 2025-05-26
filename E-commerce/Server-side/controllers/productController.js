import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { uploadImage, deleteImage } from "../utils/imageUpload.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    if (products.length === 0) {
      res.status(404).json({ message: "No products found in this category" });
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    // Get image URLs from uploaded files
    const images = [];
    if (req.files) {
      if (req.files.image01) {
        images.push(req.files.image01[0].path);
      }
      if (req.files.image02) {
        images.push(req.files.image02[0].path);
      }
      if (req.files.image03) {
        images.push(req.files.image03[0].path);
      }
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      dimensions: req.body.dimensions,
      image: images,
      stock: req.body.stock,
      specifications: req.body.specifications,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // const images = [];
  // if (req.files) {
  //   if (req.files.image01) {
  //     images.push(req.files.image01[0].path);
  //   }
  //   if (req.files.image02) {
  //     images.push(req.files.image02[0].path);
  //   }
  // }

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;
    product.stock = req.body.stock || product.stock;
    product.specifications = req.body.specifications || product.specifications;
    product.isActive =
      req.body.isActive !== undefined ? req.body.isActive : product.isActive;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if the product has images
    if (product.image && Array.isArray(product.image)) {
      // Loop through each image and delete it from Cloudinary
      for (const imageUrl of product.image) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await deleteImage(publicId);
      }
    } else if (product.image) {
      // If `product.image` is a single string (not an array)
      const publicId = product.image.split("/").pop().split(".")[0];
      await deleteImage(publicId);
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.ratings.push(review);
    product.averageRating =
      product.ratings.reduce((acc, item) => item.rating + acc, 0) /
      product.ratings.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
