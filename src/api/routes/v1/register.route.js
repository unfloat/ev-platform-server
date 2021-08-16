/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/register.controller');

const router = express.Router();

/**
 * Load location when API with locationId route parameter is hit
  * router.param('locationId', controller.load);
*/

router.get('/setParty', controller.set);
router.get('/health', controller.health);
router.get('/handshake', controller.handshake);


module.exports = router;
