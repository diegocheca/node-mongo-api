const mongoose = require('mongoose');

require('../models/user');
require('../models/todo');
require('../models/addon');
require('../models/mealType');

function getModelByName(name) {
    return mongoose.model(name);
}

module.exports = getModelByName;