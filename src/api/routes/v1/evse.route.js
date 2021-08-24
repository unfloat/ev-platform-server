/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/evse.controller');

const router = express.Router();

/**
 * Load evse when API with evseId route parameter is hit
 * router.param('evseId', controller.load);
 */

router.get('/', controller.load);

module.exports = router;
