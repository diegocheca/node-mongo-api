const express = require('express');
const { isAuthenticated } = require('../middlewares');
const addOnController = require("../controllers/addOnController");

const router = express.Router();

router.post('/', isAuthenticated, addOnController.create);
router.get('/', isAuthenticated, addOnController.getAll);
router.get('/:id', isAuthenticated, addOnController.getOne);
router.get('/applyFor/:id', isAuthenticated, addOnController.getOneForMealType);
router.put('/:id', isAuthenticated, addOnController.updateMealType);
router.delete('/:id', isAuthenticated, addOnController.deleteMealType);

module.exports = router;