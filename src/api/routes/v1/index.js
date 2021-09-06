const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const locationRoutes = require('./location.route');
// const registerRoutes = require('./register.route');
const evseRoutes = require('./evse.route');
const connectorRoutes = require('./connector.route');
const vehiculeRoutes = require('./vehicule.route');

const router = express.Router();

/**
 * GET v1/status
 */
// router.get('/status', (req, res) => res.send('OK'));
// router.use('/register', registerRoutes);

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/locations', locationRoutes);
router.use('/connectors', connectorRoutes);
router.use('/vehicules', vehiculeRoutes);

router.use('/evses', evseRoutes);

module.exports = router;
