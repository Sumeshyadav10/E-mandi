import express from "express";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import {authMiddleware, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File size too large. Maximum size is 5MB." });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router
  .route("/")
  .get(getProducts)
  .post(
    authMiddleware,
    admin,
    upload.fields([
      { name: "image01", maxCount: 1 },
      { name: "image02", maxCount: 1 },
      { name: "image03", maxCount: 1 },
    ]),
    handleUploadError,
    createProduct
  );

router
  .route("/:id")
  .get(getProductById)
  .put(
    authMiddleware,
    admin,
    upload.fields([
      { name: "image01", maxCount: 1 },
      { name: "image02", maxCount: 1 },
      { name: "image03", maxCount: 1 },
    ]),
    handleUploadError,
    updateProduct
  )
  .delete(authMiddleware, admin, deleteProduct);
  router.route("/category/:category").get(getProductsByCategory);

router.route("/:id/reviews").post(authMiddleware, createProductReview);

export default router;
