const cityService = require('../service/cityService');

// Get all cities with their associated data
exports.getAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 12, cityName, departmentName, regionName, lifeExpectancy } = req.query;

    const searchParams = {
      cityName,
      departmentName,
      regionName,
      lifeExpectancy
    };

    const cities = await cityService.getAllCities(parseInt(page), parseInt(pageSize), searchParams);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a city by ID with its associated data
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await cityService.getCityById(id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new city
exports.create = async (req, res) => {
  try {
    const { name, department_id, life_expectancy_id } = req.body;
    const newCity = await cityService.createCity(name, department_id, life_expectancy_id);
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Partially update a city
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCity = await cityService.updateById(id, updates);
    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update life expectancy of a city
exports.updateLifeExpectancy = async (req, res) => {
    try {
      const { cityId } = req.params;
      const { life_expectancy } = req.body;
      const updatedCity = await cityService.updateLifeExpectancy(cityId, life_expectancy);
      res.json(updatedCity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete a city by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await cityService.deleteCityById(id);
    res.status(204).json(deletedCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};