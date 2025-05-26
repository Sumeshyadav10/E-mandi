import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
  getUsers,
  getAllUsers,
  getUserById,
  updateUser,
  updateAddress,
  deleteUser,
  updateCart,
  removeFromCart,
  updateWishlist,
} from "../controllers/userController.js";
import {
  authenticateToken,
  admin,
  authMiddleware,
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(authMiddleware, admin, getUsers);
// changes by sumesh

// router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/all", authMiddleware, getAllUsers); // Get all users
router.get("/me", authMiddleware, getUsers);
router.put("/address", authMiddleware, updateAddress);
router.get("/profile", authMiddleware, getLoggedInUser); // Get user profile
router.put("/cart", authMiddleware, updateCart);
router.put("/cart/remove", authMiddleware, removeFromCart);

router.put("/wishlist", authMiddleware, updateWishlist);



router
  .route("/:id")
  .patch(authMiddleware, protect, admin, updateUser)
  .delete(authMiddleware, protect, admin, deleteUser);


export default router;
