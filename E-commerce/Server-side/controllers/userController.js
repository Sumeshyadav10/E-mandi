import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Product from "../models/productModel.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Admin
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const user = await User.create({
      name,
      email,
      password, // Hashing is done in the User model using `pre` middleware
      role, // Ensure the role is validated in the model
    });
    console.log("User created:", user); // Debugging line
    if (user) {
      generateToken(res, user._id); // Set JWT as an HTTP-only cookie

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Return user role
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message); // Debugging line
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email); // Debugging line

    const user = await User.findOne({ email });
    console.log("User found:", user); // Debugging line
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, user._id); // Set cookie with JWT

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// @desc    Get all users
// @route   GET /api/users/all
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Ensure only admins can access this route
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
// @desc    Update logged-in user
// @route   PUT /api/users/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update name if provided
  if (req.body.name) {
    user.name = req.body.name;
  }

  // Update role if provided (e.g., 'admin', 'farmer', 'customer')
  if (req.body.role) {
    user.role = req.body.role;
  }

  // Update isActive status if provided
  if (typeof req.body.isActive === "boolean") {
    user.isActive = req.body.isActive;
  }

  // Handle safe email update
  const newEmail = req.body.email?.trim().toLowerCase();
  const currentEmail = user.email?.trim().toLowerCase();

  if (newEmail && newEmail !== currentEmail) {
    const existingUser = await User.findOne({ email: newEmail });

    // If another user has this email, throw error
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      res.status(400);
      throw new Error("Email already in use by another account");
    }

    user.email = newEmail;
  }

  const updatedUser = await user.save();
  console.log("Updating user with ID:", req.params.id);
  console.log("Request body:", req.body);
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    isActive: updatedUser.isActive,
  });
});

const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { address, city, postalCode, country } = req.body;

  // Update the address fields
  user.address = { address, city, postalCode, country };

  const updatedUser = await user.save();
  console.log("Updated user address:", updatedUser.address); // Debugging line
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    address: updatedUser.address,
  });
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("cart.product", "name price image dimensions")
    .populate("wishlist", "name price image");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    address: user.address,
    phoneNumber: user.phoneNumber,
    cart: user.cart || [], // Default to an empty array if cart is undefined
    wishlist: user.wishlist || [], // Default to an empty array if wishlist is undefined
  });
});
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
  console.log("Token from cookies:", req.cookies.jwt); // Debugging line
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }); // Clear the cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json(user);
});

const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Fetch product details from the Product model
    const product = await Product.findById(productId).select(
      "name price image dimensions"
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check if the product already exists in the cart
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity = quantity;
    } else {
      // Add the product to the cart with all details
      user.cart.push({
        product: productId,
        quantity,
        name: product.name,
        price: product.price,
        image: product.image,
        dimensions: product.dimensions,
      });
    }

    await user.save();

    // Populate the cart with product details before sending the response
    const populatedUser = await user.populate(
      "cart.product",
      "name price image dimensions"
    );
    res.json(populatedUser.cart);
  } catch (err) {
    console.error("Error updating cart:", err.message);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    const populatedUser = await user.populate("cart.product");
    res.json(populatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
const updateWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { wishlist } = req.body;

  user.wishlist = wishlist; // Update the wishlist
  await user.save();

  res.status(200).json({
    message: "Wishlist updated successfully",
    wishlist: user.wishlist,
  });
});

export {
  registerUser,
  loginUser,
  getLoggedInUser,
  getUsers,
  getAllUsers,
  getUserById,
  updateUser,
  updateAddress,
  deleteUser,
  logoutUser,
  getProfile,
  updateCart,
  removeFromCart,
  updateWishlist,
};
