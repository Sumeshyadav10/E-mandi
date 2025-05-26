import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { subject, content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Message content cannot be empty");
  }

  // Handle attachments if any
  const attachments = req.files ? req.files.map((file) => file.path) : [];

  // Create a new message
  const newMessage = await Message.create({
    customer: req.user._id,
    message: content,
    subject,
    attachments, // Save attachment URLs
  });

  res.status(201).json({ message: "Message sent successfully", data: newMessage });
});

// @desc    Get all messages for logged-in user
// @route   GET /api/messages
// @access  Private
// @desc    Get all messages for logged-in user
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view all messages");
  }

  // Fetch all messages from customers only
  const messages = await Message.find({ customer: { $exists: true, $ne: null } })
    .sort({ createdAt: -1 })
    .populate("customer", "name email");

  res.status(200).json({
    message: "All customer messages fetched successfully",
    data: messages,
  });
});


// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)
    .populate("sender", "name email")
    .populate("recipient", "name email");

  if (message) {
    // Mark message as read if recipient is viewing
    if (
      message.recipient &&
      message.recipient._id.toString() === req.user._id.toString() &&
      !message.isRead
    ) {
      message.isRead = true;
      await message.save();
    }
    res.json({
      message: "Message retrieved successfully",
      data: message,
    });
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    // Update fields if provided
    message.subject = req.body.subject || message.subject;
    message.content = req.body.content || message.content;
    message.attachments = req.body.attachments || message.attachments;
    message.priority = req.body.priority || message.priority;
    message.isRead =
      req.body.isRead !== undefined ? req.body.isRead : message.isRead;

    const updatedMessage = await message.save();
    res.json({
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    // Allow sender, recipient, or admin to delete the message
    if (
      // message.sender.toString() === req.user._id.toString() ||
      // (message.recipient && message.recipient.toString() === req.user._id.toString()) ||
      req.user.role === "admin" // Allow admin to delete
    ) {
      await message.deleteOne();
      res.json({ message: "Message removed successfully" });
    } else {
      res.status(401);
      throw new Error("Not authorized to delete this message");
    }
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
// @access  Private
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Message.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });
  res.json({
    message: "Unread message count retrieved successfully",
    count,
  });
});

export {
  sendMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getUnreadCount,
};