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
                model: 'tradecard',
                key: 'id'
            }
        },
        trade_pokemon: {
            type: DataTypes.STRING,
        },
        buyer: {
            type: DataTypes.INTEGER,
            allowNull: true,          //allowNull
            references: {
                model: 'collector',
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