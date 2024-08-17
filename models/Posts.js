const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {};

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pokemon: {
            type: DataTypes.STRING
        },
        pokemon_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT
        },
        condition: {
            type: DataTypes.STRING
        },
        likes: {
            type: DataTypes.INTEGER
        }
        // created_at: {             // Delete created_at
        //     type: DataTypes.DATE
        // }
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    }  
);

module.exports = Posts;