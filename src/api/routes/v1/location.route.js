/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/location.controller');

const router = express.Router();

/**
 * Load location when API with locationId route parameter is hit
 * router.param('locationId', controller.load);
 */

router.get('/', controller.getLocations);
router.get('/saveLocations', controller.saveAndFormatLocations);

module.exports = router;
