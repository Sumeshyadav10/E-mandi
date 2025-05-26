import express from "express";
import { createorder, checkStatus } from "../controllers/paymentcontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router();


router.post("/pay",authMiddleware, createorder);
router.get("/verify/:orderId", checkStatus);


export default router;