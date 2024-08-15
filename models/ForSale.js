const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ForSale extends Model {};

ForSale.init(
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
        // sold: {                         //Get rid of sold
        //     type: DataTypes.BOOLEAN
        // },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        buyer: {
            type: DataTypes.INTEGER,
            allowNull: false, // allow null
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
        modelName: 'forsale',
    }  
);

module.exports = ForSale;