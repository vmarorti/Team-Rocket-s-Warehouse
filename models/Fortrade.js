const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ForTrade extends Model {};

ForTrade.init(
    {
        id: {},
        seller_id: {},
        trade: {},
        fortrade_id: {},
        trade_id: {},
        buyer: {}
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'fortrade',
    }  
);

module.exports = ForTrade;