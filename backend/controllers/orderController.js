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
    // Create order in DB
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

    // Create Razorpay order
    const options = {
      amount: req.body.amount * 100, // convert to paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    // link Razorpay order ID with our order
    newOrder.razorpayOrderId = razorpayOrder.id;
    // Save Razorpay order ID in DB
    await newOrder.save();

    await orderModel.deleteMany({
      userId: req.userId,
      payment: false,
      date: { $lt: new Date(Date.now() - 30 * 60 * 1000) },
    });

    // Clear cart data in user model
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Send order details to frontend
    res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// Verify Razorpay payment
const verifyOrder = async (req, res) => {
  // console.log("VERIFY API HIT");

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(sign).digest("hex");

    // signature mismatch
    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    // FIX: define order properly
    const order = await orderModel.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // update payment
    order.payment = true;
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // clear cart
    await userModel.findByIdAndUpdate(order.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Payment Verified Successfully",
    });
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Verification Failed",
    });
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
