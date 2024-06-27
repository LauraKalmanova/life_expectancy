const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  life_expectancy_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'life_expectancy',
      key: 'id'
    }
  }
}, {
  tableName: 'cities',
  timestamps: false
});

module.exports = City;
