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
      userId,
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
export const getUserOrders = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    
    const orders = await Order.find({userId})
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
