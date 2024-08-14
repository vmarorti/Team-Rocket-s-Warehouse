const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trader extends Model {};

Trader.init(
    {
        id: {},
        card_id: {}
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'trader',
    }  
);

module.exports = Trader;