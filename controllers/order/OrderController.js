const Order = require('../../models/Order');
const OrderItem = require('../../models/OrderItem');
const Item = require('../../models/Item');
const { sequelize } = require('./../config/database');


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




module.exports = createOrder;