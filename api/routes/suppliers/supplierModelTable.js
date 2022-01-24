const Sequelize = require('sequelize');
const instance = require('../../database');

const columns = {
    company: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    category: {
        type: Sequelize.ENUM('feed', 'toys'),
        allowNull:false
    },
}

const options = {
    freezeTableName: true,
    tableName:'suppliers',
    timestamps: true,
}

module.exports = instance.define('suppliers', columns, options)