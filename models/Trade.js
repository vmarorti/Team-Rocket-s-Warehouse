const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trade extends Model {};

Trade.init(
    {
        id: {},
        card_id: {},
        
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'trade',
    }  
);

module.exports = Trade;