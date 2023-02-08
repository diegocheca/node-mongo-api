const express = require('express');
const { isAuthenticated } = require('../middlewares');
const mealTypeController = require("../controllers/mealTypeController");

const router = express.Router();

router.post('/', isAuthenticated, mealTypeController.create);
router.get('/', isAuthenticated, mealTypeController.getAll);
router.get('/:id', isAuthenticated, mealTypeController.getOne);
router.put('/:id', isAuthenticated, mealTypeController.updateMealType);
router.delete('/:id', isAuthenticated, mealTypeController.deleteMealType);

module.exports = router;