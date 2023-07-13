import Order from "../models/orderModel.js";

// Create order
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      userInfo,
      userId,
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
      userId: userId || "guest",
      shippingDetails,
      paymentMethod,
      itemsAmount,
      shippingFee,
      tax,
      totalAmount,
      isPaid,
      paidAt,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get user orders
export const getOrderInfo = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Sorry, we cannot find this Order");

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: 1 });

    if (!orders) throw new Error("Something went wrong");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
