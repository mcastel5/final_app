// routes/orders.js
const express = require('express');
const router = express.Router();

const {
  createOrder,
  updateOrderStatus,
  getOrdersByUser,
  getAllOrders
} = require('../controllers/order/OrderController');

router.post('/orders', createOrder);
router.put('/orders/:orderId/status', updateOrderStatus);
router.get('/orders/user/:userId', getOrdersByUser);
router.get('/orders', getAllOrders);

module.exports = router;
