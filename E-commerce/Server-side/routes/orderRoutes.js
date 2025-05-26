import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  // cancelOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // adjust path if needed

const router = express.Router();

// Create a new order (User must be logged in)
router.post("/create", authMiddleware, createOrder);

// Get all orders (Maybe for Admin)
router.get("/all", authMiddleware, getAllOrders);

// Get logged-in user's own orders
router.get("/my", authMiddleware, getMyOrders);

// Cancel an order
router.delete("/cancel/:orderId", authMiddleware, deleteOrder);

router.get("/get-address", authMiddleware, async (req, res) => {
  try {
    const latestOrder = await Order.findOne({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    if (latestOrder && latestOrder.address) {
      res.json({ address: latestOrder.address });
    } else {
      res.json({ address: null });
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Server error while fetching address" });
  }
});

export default router;
