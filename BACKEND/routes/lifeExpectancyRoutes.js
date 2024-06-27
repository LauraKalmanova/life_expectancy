const express = require('express');
const router = express.Router();
const lifeExpectancyController = require('../controllers/lifeExpectancyController');
const authMiddleware = require('../authMiddleware');

router.get('/', lifeExpectancyController.getAll);
router.get('/:id', lifeExpectancyController.getById);
router.post('/', authMiddleware, lifeExpectancyController.create);
router.delete('/:id', authMiddleware, lifeExpectancyController.delete);

module.exports = router;

