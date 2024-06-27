const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LifeExpectancy = sequelize.define('LifeExpectancy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  life_expectancy: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'life_expectancy',
  timestamps: false
});

module.exports = LifeExpectancy;
