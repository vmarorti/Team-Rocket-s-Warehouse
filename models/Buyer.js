const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Buyer extends Model {};

Buyer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        buyer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'buyer',
    }
)

module.exports = Buyer;