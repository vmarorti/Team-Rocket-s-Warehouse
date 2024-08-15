const User = require('./User');
const Collector = require('./Collector');
const ForSale = require('./ForSale');
const ForTrade = require('./Fortrade');
const Posts = require('./Posts.js');
const TradeCard = require('./TradeCard.js'); //was Trade
// const Trader = require('./Trader.js');

// Work on relationships

// Users Relationships

User.hasMany(ForTrade, {
    foreignKey: 'seller_id'
});

ForTrade.belongsTo(User, {
    foreignKey: 'seller_id'
})

User.hasMany(ForSale, {
    foreignKey: 'seller_id'
})

ForSale.belongsTo(User, {
    foreignKey: 'seller_id'
})

User.hasOne(Collector, {
    foreignKey: 'buyer_id'
})

Collector.belongsTo(User, {
    foreignKey: 'buyer_id'
})

//Collectors Relationships
Collector.hasOne(ForTrade, {
    foreignKey: 'buyer'
})

ForTrade.belongsTo(Collector, {
    foreignKey: 'buyer'
})

//Fortrade Relationships
// No relation towards PK

// Trade Relationships
TradeCard.hasOne(ForTrade, {
    foreignKey: 'fortrade_id'
})

ForTrade.belongsTo(TradeCard, {
    foreignKey: 'fortrade_id'
})

// Trader Relationships

// Trader.hasOne(ForTrade, {
//     foreignKey: 'trade_id'
// })

// ForTrade.belongsTo(Trader, {
//     foreignKey: 'trade_id'
// })

// Posts Realtionships
Posts.hasOne(TradeCard, {
    foreignKey: 'card_id'
})

TradeCard.belongsTo(Posts, {
    foreignKey: 'card_id'
})

// Posts.hasOne(Trader, {
//     foreignKey: 'card_id'
// })

// Trader.belongsTo(Posts, {
//     foreignKey: 'card_id'
// })

Posts.hasOne(ForSale, {
    foreignKey: 'item_id'
})

ForSale.belongsTo(Posts, {
    foreignKey: 'Item_id'
})

// ForSale Relationships
// No relation towards PK

module.exports = { User, Collector, ForSale, ForTrade, Posts, TradeCard };
