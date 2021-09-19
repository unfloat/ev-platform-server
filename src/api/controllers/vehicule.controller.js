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

exports.load = async (req, res, next) => {
  try {
    let vehicules = await Vehicule.find();
    // .populate({path: 'users',})
    console.log(vehicules);
    res.status(200);

    return res.json(vehicules);
  } catch (error) {
    res.status(500).json({ message: error });
    return next(error);
  }
};
