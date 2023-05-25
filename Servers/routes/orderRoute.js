import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRoute = express.Router();

// Order
orderRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      userInfo,
      shippingDetails,
      paymentMethod,
      itemsAmount,
      shippingFee,
      tax,
      totalAmount,
      isPaid,
      paidAt,
    } = req.body;

    const order = new Order({
      orderItems,
      userInfo,
      shippingDetails,
      paymentMethod,
      itemsAmount,
      shippingFee,
      tax,
      totalAmount,
      isPaid,
      paidAt,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  })
);

export default orderRoute;
