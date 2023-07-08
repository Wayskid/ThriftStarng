import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const orderRoute = express.Router();

// Order
orderRoute.post("/", createOrder);

// Get user oders
orderRoute.get("/:userId", protect, getUserOrders);

export default orderRoute;
