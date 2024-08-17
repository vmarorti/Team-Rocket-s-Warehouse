const Sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = sequelize;