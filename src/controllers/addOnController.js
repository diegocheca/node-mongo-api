const getModelByName = require('../db/getModelByName');


module.exports.create = function (req, res) {
  if (!req.body.addon) return res.status(200).send({ success: false, error: "addon type info not found" });

  const Addon = getModelByName('addon');

  try {
    Addon.create(req.body.addon)
      .then((addon) => {
        res.status(200).send({ success: true, data: { addon } });
      }).catch(error => res.status(200).send({ success: false, error: error.message }));
  } catch(error) {
    res.status(500).send({ success: false, error: error.message })
  }
}

module.exports.getAll = function (req, res) {
  const Addon = getModelByName('addon');
  const MealType = getModelByName('mealType');
  Addon.getAll()
    .then((addon) => {
      var new_obj = {};
      var response = addon.map(function(item){
        MealType.getOne(req.applyFor._id)
        .then((mealtype) => {
          item.push(meal_type_obj);
          new_obj.push = item;
        });
      });
      res.status(200).send({ success: true, data: { response } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports.getOne = function (req, res) {
  const Addon = getModelByName('addon');

  Addon.getOne(req.params.id)
    .then((addon) => {
      res.status(200).send({ success: true, data: { addon } });
    }).catch(error => res.status(200).send({ success: false, error: error.message }));
}

module.exports.getOneForMealType = function (req, res) {
  const Addon = getModelByName('addon');

  Addon.getOneApplyFor(req.params.id)
    .then((addon) => {
      res.status(200).send({ success: true, data: { addon } });
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