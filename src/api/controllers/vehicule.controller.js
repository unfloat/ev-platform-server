const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Vehicule = require('../models/vehicule.model');

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
/**
 * Update existing Vehicule
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const oldVehicule = await Vehicule.get(req.query.vehiculeId);
    const owner = oldVehicule.owner;

    const vehicule = Object.assign(oldVehicule, req.body, {
      override: true,
    });

    const updatedVehicule = await vehicule.save();

    res.status(200);
    res.json(owner);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete vehicule
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const vehicule = await Vehicule.get(req.query.vehiculeId);
    const owner = vehicule.owner;
    console.log('vehicule', vehicule);

    vehicule
      .remove()
      .then(() => res.status(httpStatus.NO_CONTENT))
      .catch(e => next(e));

    return res.json(owner);
  } catch (error) {
    next(error);
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
