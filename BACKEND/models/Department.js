const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Region = require('./Region'); 

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Region,
      key: 'id'
    }
  }
}, {
  tableName: 'departments',
  timestamps: false
});

Department.belongsTo(Region, { foreignKey: 'region_id' });

module.exports = Department;
