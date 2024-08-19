const Sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DB_NAME);

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

module.exports = sequelize;