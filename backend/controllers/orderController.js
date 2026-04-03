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
      date: { $lt: new Date(Date.now() - 30 * 60 * 1000) } // 30 min old
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
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(sign).digest("hex");

    // console.log("VERIFY HIT");
    // console.log("BODY:", req.body);
    console.log("EXPECTED:", expectedSign);
    console.log("RECEIVED:", razorpay_signature);
    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
    // Find order
    const order = await orderModel.findOne({
      razorpayOrderId: razorpay_order_id,
    });
    console.log("FOUND ORDER:", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order
    order.payment = true;
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    //DELETE FAILED ORDERS (ADD THIS HERE)
    const result = await orderModel.deleteMany({
      userId: req.userId,
      payment: false
    });

    console.log("DELETED FAILED ORDERS:", result.deletedCount);

    // FINAL RESPONSE
    res.json({ success: true, message: "Payment Verified Successfully" });

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: "Verification Failed" });
  }
};

// Get orders of a user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId, payment: true });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const deleteFailedOrders = async (req, res) => {
  try {
    const result = await orderModel.deleteMany({
      userId: req.userId,
      payment: false
    });

    res.json({
      success: true,
      deleted: result.deletedCount
    });

  } catch (error) {
    res.json({ success: false });
  }
};

export { placeOrder, verifyOrder, userOrders, deleteFailedOrders };
