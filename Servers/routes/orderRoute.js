import express from "express";
import {
  createOrder,
  getOrderInfo,
  getUserOrders,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const orderRoute = express.Router();

// Order
orderRoute.post("/", createOrder);

// Get order details
orderRoute.get("/:orderId", getOrderInfo);

// Get user oders
orderRoute.get("/:userId", protect, getUserOrders);

export default orderRoute;
