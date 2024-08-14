const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ForTrade extends Model {};

ForTrade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        seller_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        trade: {
            type: DataTypes.BOOLEAN,
        },
        fortrade_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trade',
                key: 'id'
            }
        },
        trade_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trader',
                key: 'id'
            }
        },
        buyer: {
            type: DataTypes.INTEGER,
            references: {
                model: 'buyer',
                key: 'id'
            }
        }
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'fortrade',
    }  
);

module.exports = ForTrade;