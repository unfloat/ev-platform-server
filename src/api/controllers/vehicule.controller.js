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
    const user = await User.get(req.body.userId);
    const vehicule = await new Vehicule({
      brand: req.body.brand,
      model: req.body.model,
      standard: req.body.standard,
      format: req.body.format,
      power_type: req.body.power_type,
      max_voltage: req.body.max_voltage,
      max_amperage: req.body.max_amperage,
      owner: user,
    });
    const savedVehicule = await vehicule.save();
    console.log(savedVehicule, 'savedVehicule');
    res = res.status(httpStatus.CREATED);
    // .json(user);
    console.log(user._id);
    return res.json({ id: user._id });
    // next(user);
  } catch (error) {
    return next();
  }
};

exports.load = async (req, res, next) => {
  try {
    const user = await User.get(req.query.userId);
    let vehicules = await Vehicule.find({ owner: user });
    res.status(200);
    return res.json(vehicules);
  } catch (error) {
    return next(error);
  }
};
