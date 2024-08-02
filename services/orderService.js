// services/orderService.js
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Item = require('../models/Item');
const { sequelize } = require('../config/database');

// Create a new order
async function createOrder(orderData) {
  const t = await sequelize.transaction();

  try {
    const order = await Order.create({
      user_id: orderData.user_id,
      total_amount: orderData.total_amount,
      status: 'pending'
    }, { transaction: t });

    const orderItems = await Promise.all(orderData.items.map(async (item) => {
      const menuItem = await Item.findOne({
        where: { order_item_id: item.item_id, available: true },
        transaction: t
      });

      if (!menuItem) {
        throw new Error(`Item ${item.item_id} not found or not available`);
      }

      return OrderItem.create({
        order_id: order.order_id,
        item_id: item.item_id,
        quantity: item.quantity,
        subtotal: menuItem.price * item.quantity
      }, { transaction: t });
    }));

    await t.commit();
    return { order, orderItems };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

// Retrieve all orders by a specific user
async function getOrdersByUser(userId) {
  try {
    return await Order.findAll({ where: { user_id: userId } });
  } catch (error) {
    throw error;
  }
}

// Retrieve all orders
async function getAllOrders() {
  try {
    return await Order.findAll();
  } catch (error) {
    throw error;
  }
}

// Update the status of an order
async function updateOrderStatus(orderId, newStatus) {
  const t = await sequelize.transaction();

  try {
    const [updated] = await Order.update(
      { status: newStatus },
      { where: { order_id: orderId }, transaction: t }
    );

    if (updated === 0) {
      throw new Error('Order not found');
    }

    await t.commit();
    return { message: 'Order status updated successfully' };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrdersByUser,
  getAllOrders
};
