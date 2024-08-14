const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ForSale extends Model {};

ForSale.init(
    {
        id: {},
        seller_id: {},
        sold: {},
        item_id: {},
        buyer: {}
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'forsale',
    }  
);

module.exports = ForSale;