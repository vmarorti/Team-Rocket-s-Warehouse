const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trade extends Model {};

Trade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id',
            }
        }
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'trade',
    }  
);

module.exports = Trade;