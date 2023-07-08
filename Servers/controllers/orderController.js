import Order from "../models/orderModel.js";

// Create order
export const createOrder = async (req, res) => {
  try {
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

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
