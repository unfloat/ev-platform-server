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
router.put('/cpo/update', controller.update);
// router.route('/update').put(controller.update);

router.get('/geolocation', controller.getLocationsByUserGeolocation);
router.get('/connectiontypeid', controller.getLocationsByConnectorType);
router.get('/cpo', controller.getCpoOwnedLocations);
router.get('/saveLocations', controller.saveAndFormatLocations);
router.post('/new', controller.createLocation);

router.delete('/cpo/delete', controller.remove);

module.exports = router;
