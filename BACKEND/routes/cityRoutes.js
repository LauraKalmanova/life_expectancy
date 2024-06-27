const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const cityController = require('../controllers/cityController');

router.get('/', cityController.getAll);
router.get('/:id', cityController.getById);
router.post('/', authMiddleware, cityController.create);
router.put('/:id', authMiddleware, cityController.updateLifeExpectancy);
router.delete('/:id', authMiddleware, cityController.delete);
router.patch('/:id', authMiddleware, cityController.updateById); 

module.exports = router;