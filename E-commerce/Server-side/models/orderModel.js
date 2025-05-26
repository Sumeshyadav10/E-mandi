import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderID: {
      type: String,
      unique: true, // Ensure uniqueness
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "UPI", "Credit/Debit Card"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Generate a unique `orderID` before saving
orderSchema.pre("save", function (next) {
  if (!this.orderID) {
    this.orderID = `ORD-${Date.now()}`; // Generate a unique order ID
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;