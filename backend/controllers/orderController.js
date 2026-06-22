import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Place order and create Razorpay order
const placeOrder = async (req, res) => {
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  try {
    // Create order in DB (not saved yet)
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    // Link Razorpay order ID and save
    newOrder.razorpayOrderId = razorpayOrder.id;
    await newOrder.save();

    console.log("Order saved:", {
      orderId: newOrder._id,
      razorpayOrderId: newOrder.razorpayOrderId,
    });

    // Clean up old unpaid orders (NEVER delete the one we just created)
    await orderModel.deleteMany({
      userId: req.userId,
      payment: false,
      _id: { $ne: newOrder._id },
      date: { $lt: new Date(Date.now() - 30 * 60 * 1000) },
    });

    // Send order details to frontend
    res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
    res.json({ success: false, message: "Error placing order: " + error.message });
  }
};


// Verify Razorpay payment
const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log("🔍 Verifying payment for razorpay_order_id:", razorpay_order_id);

    // Check required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.json({ success: false, message: "Missing payment details" });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      console.log("❌ Signature mismatch:", { expectedSign, razorpay_signature });
      return res.json({ success: false, message: "Invalid Signature" });
    }

    console.log("✅ Signature verified. Searching DB for:", razorpay_order_id);

    // Find order by Razorpay order ID
    const order = await orderModel.findOne({ razorpayOrderId: razorpay_order_id });

    // Debug: show recent orders if not found
    if (!order) {
      const recentOrders = await orderModel.find({}).sort({ date: -1 }).limit(5).select("razorpayOrderId payment date");
      console.log("❌ Order not found. Last 5 orders in DB:", JSON.stringify(recentOrders, null, 2));
      return res.json({ success: false, message: "Order not found" });
    }

    console.log("✅ Order found:", order._id);

    // Update payment status
    order.payment = true;
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Clear cart
    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

    res.json({ success: true, message: "Payment Verified Successfully" });
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.json({ success: false, message: "Verification Failed: " + error.message });
  }
};


// Get orders of a user
const userOrders = async (req, res) => {
  try {
    console.log("USER ID:", req.userId);
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const deleteFailedOrders = async (req, res) => {
  try {
    await orderModel.deleteMany({
      userId: req.userId,
      payment: false,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status
// update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.json({ success: false, message: "Missing fields" });
    }
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  deleteFailedOrders,
  listOrders,
  updateStatus,
};
