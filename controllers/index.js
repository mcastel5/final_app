// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config'); // Import the config

// Create the Sequelize instance using the configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
  host: config.host,
  dialectOptions: config.dialectOptions,
});

// Import models after Sequelize instance is created
const User = require('./user/User')(sequelize); // Pass sequelize instance to the model
const Menu = require('./menu/Menu')(sequelize); // Similar for other models
const Order = require('./order/Order')(sequelize);
const OrderItem = require('./order-items/OrderItem')(sequelize);

// Define relationships
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Menu.hasMany(OrderItem, { foreignKey: 'menu_id' });
OrderItem.belongsTo(Menu, { foreignKey: 'menu_id' });

// Export the sequelize instance and models
module.exports = {
  sequelize,
  User,
  Menu,
  Order,
  OrderItem,
};
