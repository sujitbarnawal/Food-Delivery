import dotenv from "dotenv";
dotenv.config();

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = process.env.FRONTEND_URL;

//Place the user's order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 3 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/cancel?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//verify order for payment status(Web hooks should be used instead of this)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success==="true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed and order deleted" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//user's orders for frontend
const userOrders=async(req,res)=>{
  try {
    const orders = await Order.find({userId:req.body.userId})
    return res.json({success:true,data:orders})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

//all users orders for admin
const listOrders=async(req,res)=>{
  try {
    const orders = await Order.find({})
    return res.json({success:true,data:orders})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

//updating order status
const updateOrderStatus=async(req,res)=>{
  try {
    await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    return res.json({success:true,message:"Order status updated"})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export { placeOrder, verifyOrder,userOrders,listOrders,updateOrderStatus };
