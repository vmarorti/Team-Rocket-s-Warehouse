const sequelize = require('../config/connection');
const {ForSale,ForTrade, Posts, TradeCard, User } = require('../models');

const userData = require('./userData.json');
const forSaleData = require('./forsaleData.json');
const forTradeData = require('./fortradeData.json');
const postsData = require('./postsData.json');
const tradeData = require('./tradeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Posts.bulkCreate(postsData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await TradeCard.bulkCreate(tradeData);

  await ForTrade.bulkCreate(forTradeData);

  await ForSale.bulkCreate(forSaleData);


  process.exit(0);
};

seedDatabase();
