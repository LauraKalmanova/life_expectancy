const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('life_expectancy_db', 'root', 'user', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
