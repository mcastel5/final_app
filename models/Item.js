//Order-item.js
const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../controllers/config/database'); 


const Item = sequelize.define('Order-item', {
    order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'items',
  timestamps: false,
});
module.exports = Item;
