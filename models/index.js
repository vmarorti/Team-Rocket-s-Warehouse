const User = require('./User');
const Buyer = require('./Buyer');
const ForSale = require('./ForSale');
const ForTrade = require('./Fortrade');
const Posts = require('./Posts.js');
const Trade = require('./Trade.js');
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

User.hasOne(Buyer, {
    foreignKey: 'buyer_id'
})

Buyer.belongsTo(User, {
    foreignKey: 'buyer_id'
})

//Buyers Relationships
Buyer.hasOne(ForTrade, {
    foreignKey: 'buyer'
})

ForTrade.belongsTo(Buyer, {
    foreignKey: 'buyer'
})

//Fortrade Relationships
// No relation towards PK

// Trade Relationships
Trade.hasOne(ForTrade, {
    foreignKey: 'fortrade_id'
})

ForTrade.belongsTo(Trade, {
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
Posts.hasOne(Trade, {
    foreignKey: 'card_id'
})

Trade.belongsTo(Posts, {
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

module.exports = { User, Buyer, ForSale, ForTrade, Posts, Trade, Trader };
