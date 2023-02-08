const mongoose = require('mongoose');
//var MealType = mongoose.model('mealType')

const AddonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  applyFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mealType" 
  },
  comment: {
    type: String,
  },
});

AddonSchema.statics.create = create;
AddonSchema.statics.getAll = getAll;
AddonSchema.statics.getOneApplyFor = getOneApplyFor;
AddonSchema.statics.getOne = getOne;
AddonSchema.statics.updateAddon = updateAddon;
AddonSchema.statics.deleteAddon = deleteAddon;

mongoose.model('addon', AddonSchema, 'addons');

function create(addonInfo, mealTypeid) {
  if (!addonInfo.name) throw new Error('name is required');
  if (!addonInfo.price) throw new Error('price is required');

  addonInfo.applyFor = mealTypeid;

  const addon = new this(addonInfo);
  return addon.save();
}

function getAll() {
  return this.find();
}

function getOneApplyFor(mealtypeId) {
  return this.find({ applyFor: mealtypeId })
    .then(addon => {
      if (!addon) throw new Error('addon not found');

      return addon;
    })
}

function getOne(addonId) {
  return this.findOne({ _id: addonId })
    .then(addon => {
      if (!addon) throw new Error('addon not found');

      return addon;
    })
}

function updateAddon(addonId, addonInfo = {}, mealtype) {
  const update = {};
  if (addonInfo.name) update.name = addonInfo.name;
  if (addonInfo.price) update.price = addonInfo.price;
  if (addonInfo.applyFor) update.applyFor = mealtype._id;
  if (addonInfo.comment) update.comment = addonInfo.comment;

  return this.findOne({ _id: addonId })
    .then(addon => {
      if (!addon) throw new Error('addon not found');
      if (Object.keys(update).length == 0) return addon;

      addon.set(update);
      return addon.save();
    });
}

function deleteAddon(addonId) {
  return this.findOne({ _id: addonId })
    .then(addon => {
      if (!addon) throw new Error('addon not found');

      return addon.remove();
    });
}