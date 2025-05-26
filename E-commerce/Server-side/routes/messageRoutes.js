import express from "express";
import {
  // createMessage,
  sendMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getUnreadCount,
} from "../controllers/messageController.js";
import { authMiddleware,protect,admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, upload.array("attachments", 5),protect, sendMessage)
  .get(authMiddleware, getMessages);

router.route("/unread/count").get(authMiddleware, getUnreadCount);

router
  .route("/:id")
  .get(authMiddleware, getMessageById)
  .put(authMiddleware, updateMessage)
  .delete(authMiddleware,admin, deleteMessage);

export default router;
