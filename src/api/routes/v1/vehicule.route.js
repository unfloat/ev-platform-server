/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/vehicule.controller');

const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const Vehicule = require('../../models/vehicule.model');

const router = express.Router();

/**
 * Load location when API with locationId route parameter is hit
 * router.param('locationId', controller.load);
 */

router.post('/add', controller.create);
router.get('/', controller.load);

module.exports = router;
