//database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'spankmaster', '123Realdevs##', {
  dialect: 'postgres',
  host: 'spankmaster.c9mguyueyplb.us-east-1.rds.amazonaws.com',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});



module.exports = { sequelize};