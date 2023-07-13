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
orderRoute.get("/info/:orderId", getOrderInfo);

// Get user orders
orderRoute.get("/user/:userId", protect, getUserOrders);

export default orderRoute;
