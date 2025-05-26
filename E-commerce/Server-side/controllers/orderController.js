import Order from "../models/orderModel.js";

// Create New Order
export const createOrder = async (req, res) => {
  try {
    const { products, address, paymentMethod } = req.body;

    if (!products || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const order = new Order({
      user: req.user._id, // Attach logged-in user's ID
      products,
      address,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Orders (For Admin maybe)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId", "name price image");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Orders of Logged-in User (User's Order History)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.productId", "name image") // Populate product name and image
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// export const cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params; // This is the `orderID` sent from the frontend

//     // Find the order by `orderID` instead of `_id`
//     const order = await Order.findOne({ orderID: orderId });

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found." });
//     }

//     // Check if the order is already canceled
//     if (order.status === "Canceled") {
//       return res
//         .status(400)
//         .json({ success: false, message: "Order is already canceled." });
//     }

//     // Update the order status to "Canceled"
//     order.status = "Canceled";
//     await order.save();

//     console.log(`Order ${orderId} has been canceled.`);

//     res
//       .status(200)
//       .json({ success: true, message: "Order canceled successfully." });
//   } catch (error) {
//     console.error("Error canceling order:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Extract the `orderID` from the request parameters

    // Find and delete the order by `orderID`
    const order = await Order.findOneAndDelete({ orderID: orderId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    console.log(`Order ${orderId} has been deleted.`);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
