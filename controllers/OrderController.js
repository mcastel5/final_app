// controllers/ordersController.js
const { createOrder, updateOrderStatus, getOrdersByUser, getAllOrders } = require('../services/orderService');

// Create a new order
exports.createOrder = async (req, res) => {
  const { user_id, total_amount, items } = req.body;

  if (!user_id || !total_amount || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data. Please provide user_id, total_amount, and items array.'
    });
  }

  try {
    const { order, orderItems } = await createOrder({ user_id, total_amount, items });
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order,
      orderItems
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order.',
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  if (!orderId || !newStatus) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data. Please provide orderId and newStatus.'
    });
  }

  try {
    const result = await updateOrderStatus(orderId, newStatus);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the order status.',
      error: error.message
    });
  }
};

// Retrieve all orders by user
exports.getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await getOrdersByUser(userId);
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error retrieving orders by user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving orders by user.',
      error: error.message
    });
  }
};

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error retrieving all orders:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving all orders.',
      error: error.message
    });
  }
};
