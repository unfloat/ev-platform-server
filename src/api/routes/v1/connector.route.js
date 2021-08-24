/* eslint-disable max-len */
/* eslint-disable indent */
const express = require('express');
const controller = require('../../controllers/connector.controller');

const router = express.Router();

/**
 * Load connector when API with connectorId route parameter is hit
 * router.param('connectorId', controller.load);
 */

router.get('/', controller.load);

module.exports = router;
