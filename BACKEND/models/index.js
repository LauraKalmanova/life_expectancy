const sequelize = require('../config/database');
const Region = require('./Region');
const Department = require('./Department');
const City = require('./City');
const LifeExpectancy = require('./LifeExpectancy');
const User = require('./User');

Region.hasMany(Department, { foreignKey: 'region_id' });
Department.belongsTo(Region, { foreignKey: 'region_id' });

Department.hasMany(City, { foreignKey: 'department_id' });
City.belongsTo(Department, { foreignKey: 'department_id' });

City.belongsTo(LifeExpectancy, { foreignKey: 'life_expectancy_id' });
LifeExpectancy.hasMany(City, { foreignKey: 'life_expectancy_id' });

module.exports = {
  sequelize,
  Region,
  Department,
  City,
  LifeExpectancy,
  User
};
