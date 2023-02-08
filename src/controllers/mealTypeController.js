const getModelByName = require('../db/getModelByName');


module.exports.create = function (req, res) {
  if (!req.body.mealType) return res.status(200).send({ success: false, error: "meal type info not found" });

  const MealType = getModelByName('mealType');

  try {
    MealType.create(req.body.mealType, req.user)
      .then((mealtype) => {
        res.status(200).send({ success: true, data: { mealtype } });
      }).catch(error => res.status(200).send({ success: false, error: error.message }));
  } catch(error) {
    res.status(500).send({ success: false, error: error.message })
  }
}

module.exports.getAll = function (req, res) {
  const MealType = getModelByName('mealType');

  MealType.getAll()
    .then((mealtypes) => {
      res.status(200).send({ success: true, data: { mealtypes } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports.getOne = function (req, res) {
  const MealType = getModelByName('mealType');

  MealType.getOne(req.params.id)
    .then((mealtype) => {
      res.status(200).send({ success: true, data: { mealtype } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports.updateMealType = function (req, res) {
  const MealType = getModelByName('mealType');

  MealType.updateMealType(req.params.id, req.body.mealType, req.user)
    .then((mealType) => {
      res.status(200).send({ success: true, data: { mealType } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports.deleteMealType = function (req, res) {
  const MealType = getModelByName('mealType');

  MealType.deleteMealType(req.params.id)
    .then((mealType) => {
      console.log('mealType removed - ', mealType);
      res.status(200).send({ success: true, message: 'mealType removed successfully' });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}