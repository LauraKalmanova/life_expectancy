const { LifeExpectancy, City, Department, Region } = require('../models');
const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;

// Get all cities with their associated data and search functionality
exports.getAllCities = async (page, pageSize, searchParams) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const { cityName, departmentName, regionName, lifeExpectancy } = searchParams;

    // Create the query options
    const queryOptions = {
      include: [
        {
          model: Department,
          include: [Region],
          where: {},
        },
        {
          model: LifeExpectancy,
          where: {},
        }
      ],
      offset,
      limit
    };

    // Add search conditions if they exist
    if (cityName) {
      queryOptions.where = {
        ...queryOptions.where,
        name: {
          [Op.like]: `%${cityName}%`
        }
      };
    }

    if (departmentName) {
      queryOptions.include[0].where.name = {
        [Op.like]: `%${departmentName}%`
      };
    }

    if (regionName) {
      queryOptions.include[0].include[0].where = {
        name: {
          [Op.like]: `%${regionName}%`
        }
      };
    }

    if (lifeExpectancy) {
      queryOptions.include[1].where.life_expectancy = lifeExpectancy;
    }

    // Execute the query
    const cities = await City.findAndCountAll(queryOptions);

    return {
      total: cities.count,
      totalPages: Math.ceil(cities.count / pageSize),
      currentPage: page,
      pageSize,
      cities: cities.rows
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


// Get a city by ID with its associated data
exports.getCityById = async (id) => {
  try {
    const city = await City.findByPk(id, {
      include: [
        {
          model: Department,
          include: [Region]
        },
        LifeExpectancy
      ]
    });
    return city;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new city
exports.createCity = async (name, departmentId, lifeExpectancyId) => {
  try {
    const newCity = await City.create({
      name,
      department_id: departmentId,
      life_expectancy_id: lifeExpectancyId
    });
    return newCity;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a city
exports.updateById = async (id, updates) => {
  try {
    const city = await City.findByPk(id);
    if (!city) {
      throw new Error('City not found');
    }

    await city.update(updates);
    return city;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update life expectancy of a city
exports.updateLifeExpectancy = async (id, life_expectancy) => {
    try {
      // Find the city by its ID
      const city = await City.findByPk(id);
      if (!city) {
        throw new Error('City not found');
      }
  
      // Find or create the corresponding life expectancy record by its value
      let lifeExpectancyRecord = await LifeExpectancy.findOne({ where: { life_expectancy: life_expectancy } });
      if (!lifeExpectancyRecord) {
        lifeExpectancyRecord = await LifeExpectancy.create({ life_expectancy: life_expectancy });
      }
  
      // Update the city's life_expectancy_id with the found or newly created life expectancy record id
      await city.updateLifeExpectancy({ life_expectancy_id: lifeExpectancyRecord.id });
  
      return city;
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Delete a city by ID
exports.deleteCityById = async (id) => {
  try {
    const city = await City.findByPk(id);
    if (!city) {
      throw new Error('City not found');
    }

    await city.destroy();

    return city;
  } catch (error) {
    throw new Error(error.message);
  }
};