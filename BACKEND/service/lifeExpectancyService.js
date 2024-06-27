const { LifeExpectancy, City, Department, Region } = require('../models');

exports.getAllLifeExpectancies = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const lifeExpectancies = await LifeExpectancy.findAndCountAll({
      include: [
        {
          model: City,
          include: [
            {
              model: Department,
              include: [Region]
            }
          ]
        }
      ],
      offset,
      limit
    });

    return {
      total: lifeExpectancies.count,
      totalPages: Math.ceil(lifeExpectancies.count / pageSize),
      currentPage: page,
      pageSize,
      lifeExpectancies: lifeExpectancies.rows
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a life expectancy entry by ID
exports.getLifeExpectancyById = async (id) => {
  try {
    const lifeExpectancy = await LifeExpectancy.findByPk(id, {
      include: [
        {
          model: City,
          include: [
            {
              model: Department,
              include: [Region]
            }
          ]
        }
      ]
    });
    return lifeExpectancy;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new life expectancy entry
exports.createLifeExpectancy = async (life_expectancy) => {
    try {
      // Create the life expectancy record
      const newLifeExpectancy = await LifeExpectancy.create({ life_expectancy: life_expectancy });
  
      return newLifeExpectancy;
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Delete a life expectancy entry by ID
exports.deleteLifeExpectancy = async (id) => {
    try {
      const lifeExpectancy = await LifeExpectancy.findByPk(id);
      if (!lifeExpectancy) {
        throw new Error('Life expectancy not found');
      }
  
      await lifeExpectancy.destroy();
  
      return lifeExpectancy;
    } catch (error) {
      throw new Error(error.message);
    }
  };

