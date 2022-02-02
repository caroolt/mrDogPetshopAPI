const Sequelize = require('sequelize');
const instance = require('../../../database');

const columns = {
    tittle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    supplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../supplierModelTable'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'products',
    timestamps: true,
}

module.exports = instance.define('products', columns, options)