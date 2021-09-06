/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/vehicule.controller');

const router = express.Router();

/**
 * Load location when API with locationId route parameter is hit
 * router.param('locationId', controller.load);
 */

router.route('/').post(controller.create);

module.exports = router;
