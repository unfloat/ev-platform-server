const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Vehicule = require('../models/vehicule.model');

/**
 * Load user and append to req.
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const vehicule = new Vehicule(req.body);
    const savedVehicule = await vehicule.save();
    const user = User.get(req.body.id);
    res.status(httpStatus.CREATED);
    // next(savedVehicule);
    res.json(user);
    return next();
  } catch (error) {
    return next(error);
  }
};
