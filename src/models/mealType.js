const mongoose = require('mongoose');


const MealTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

MealTypeSchema.statics.create = create;
MealTypeSchema.statics.getAll = getAll;
MealTypeSchema.statics.getOne = getOne;
MealTypeSchema.statics.updateMealType = updateMealType;
MealTypeSchema.statics.deleteMealType = deleteMealType;

mongoose.model('mealType', MealTypeSchema, 'mealTypes');

function create(mealTypeInfo) {
  if (!mealTypeInfo.name) throw new Error('name is required');

  const mealType = new this(mealTypeInfo);
  return mealType.save();
}

function getAll() {
  return this.find();
}

function getOne(mealTypeId) {
  return this.findOne({ _id: mealTypeId })
    .then(mealType => {
      if (!mealType) throw new Error('mealType not found');

      return mealType;
    })
}

function updateMealType(mealTypeId, mealTypeInfo = {}) {
  const update = {};
  if (mealTypeInfo.name) update.name = mealTypeInfo.name;
  if (mealTypeInfo.description) update.description = mealTypeInfo.description;

  return this.findOne({ _id: mealTypeId })
    .then(mealType => {
      if (!mealType) throw new Error('mealType not found');
      if (Object.keys(update).length == 0) return mealType;

      mealType.set(update);
      return mealType.save();
    });
}

function deleteMealType(mealTypeId) {
  return this.findOne({ _id: mealTypeId })
    .then(mealType => {
      if (!mealType) throw new Error('mealType not found');

      return mealType.remove();
    });
}