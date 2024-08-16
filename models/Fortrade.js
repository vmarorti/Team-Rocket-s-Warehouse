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
                model: 'user',
                key: 'id'
            }
        },
        trade: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        // trade_pokemon: {                 not really sure why this was here but will change back if needed
        //     type: DataTypes.STRING,
        // },
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