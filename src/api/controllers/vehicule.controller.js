const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Vehicule = require('../models/vehicule.model');

/**
 * Load user and append to req.
 * @public
 */
exports.create = (req, res, next, id) => {
  try {
    const vehicule = new Vehicule(req.body);
    // const savedVehicule = await vehicule.save();
    res.status(httpStatus.CREATED);

    // res.json(savedVehicule.transform());
  } catch (error) {
    return next(error);
  }
};
