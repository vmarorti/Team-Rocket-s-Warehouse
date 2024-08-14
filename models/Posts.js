const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {};

Posts.init(
    {
        id: {},
        pokemon: {},
        price: {},
        condition: {},
        likes: {},
        created_at: {}
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    }  
);

module.exports = Posts;