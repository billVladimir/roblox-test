const { Sequelize, DataTypes } = require('sequelize');
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD } = require('./config');

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
})

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
}, {});

module.exports = {
    sequelize,
    User,
}