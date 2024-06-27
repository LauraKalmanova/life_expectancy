const lifeExpectancyService = require('../service/lifeExpectancyService');

// Get all life expectancy entries
exports.getAll = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query; // Default values: page 1, 10 items per page
    const lifeExpectancies = await lifeExpectancyService.getAllLifeExpectancies(parseInt(page), parseInt(pageSize));
    res.json(lifeExpectancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an entry by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const lifeExpectancy = await lifeExpectancyService.getLifeExpectancyById(id);
    if (lifeExpectancy) {
      res.json(lifeExpectancy);
    } else {
      res.status(404).json({ error: 'Life expectancy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new life expectancy record
exports.create = async (req, res) => {
  try {
    const { region, department, city, life_expectancy } = req.body;

    // Call the service function to create the life expectancy record
    const newLifeExpectancy = await lifeExpectancyService.createLifeExpectancy(life_expectancy);

    res.status(201).json(newLifeExpectancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a life expectancy record
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Call the service function to delete the life expectancy record
    const deletedLifeExpectancy = await lifeExpectancyService.deleteLifeExpectancy(id);

    res.status(204).json({ message: 'Life expectancy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

