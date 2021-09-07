/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
// const { create } = require('../../controllers/vehicule.controller');

const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const Vehicule = require('../../models/vehicule.model');
const controller = require('../../controllers/user.controller');

const router = express.Router();

/**
 * Load location when API with locationId route parameter is hit
 * router.param('locationId', controller.load);
 */

router.route('/').post(async (req, res, next) => {
  const vehicule = new Vehicule(req.body);
  const user = await User.get(req.body.id);
  user.vehicules = [vehicule];
  await user.updateOne(newUser.toObject(), { override: true, upsert: true });
  console.log('user ======================', user);
  const savedVehicule = await vehicule.save();
  res.status(httpStatus.CREATED);
  // next(savedVehicule);
  res.json(savedVehicule);
  //   return next();
});

module.exports = router;
