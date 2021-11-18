const {
  getLocationsProvider,
  getLocationsByUserGeolocationProvider,
  getLocationsByConnectorTypeProvider,
} = require('../services/locationProvider');
const Location = require('../models/location.model');
const Connector = require('../models/connector.model');
const Evse = require('../models/evse.model');
const User = require('../models/user.model');
const httpStatus = require('http-status');
const axios = require('axios');

exports.getLocations = async (req, res, next) => {
  try {
    const savedLocations = await getLocationsProvider(req.query);
    console.log('req.query', req.query);
    console.log(savedLocations, 'savedLocations');

    res.status(200);
    return res.json(savedLocations);
  } catch (error) {
    res.status(500);
    return next(error);
  }
};
exports.getLocationsByUserGeolocation = async (req, res, next) => {
  try {
    const savedLocations = await getLocationsByUserGeolocationProvider(
      req.query,
    );

    res.status(200);

    return res.json(savedLocations);
  } catch (error) {
    res.status(500);

    return next(error);
  }
};

exports.getLocationsByConnectorType = async (req, res, next) => {
  try {
    console.log('req.query', req.query);
    // const { latitude, longitude } = req.query;
    const savedLocations = await getLocationsByConnectorTypeProvider(req.query);

    res.status(200);
    return res.json(savedLocations);
  } catch (error) {
    return next(error);
  }
};
// exports.getLocations = async (req, res, next) => {
//   try {
//     let locations = await Location.find({ is_green_energy: true }).populate({
//       path: 'evses',
//       // Get friends of friends - populate the 'friends' array for every friend
//       populate: { path: 'connectors' },
//     });
//     console.log(locations);
//     res.status(200);

//     return res.json(locations);
//   } catch (error) {
//     res.status(500).json({ message: error });
//     return next(error);
//   }
// };

exports.getCpoOwnedLocations = async (req, res, next) => {
  try {
    console.log(req.query.userId);
    const user = await User.get(req.query.userId);

    let locations = await Location.find({ owner: user });
    console.log('Locations', locations);
    res.status(200);
    return res.json(locations);
  } catch (error) {
    return next(error);
  }
};

/**
 * Update existing CPO Location
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const oldLocation = await Location.get(req.query.locationId);
    console.log('oldLocation', oldLocation);
    console.log('req.body', req.body);

    const location = Object.assign(oldLocation, req.body, {
      override: false,
    });
    const updatedLocation = await location.save();
    console.log('updatedLocation', updatedLocation);

    res.status(200);
    res.json(oldLocation.owner); //req.query.owner
  } catch (error) {
    next(error);
  }
};

exports.saveAndFormatLocations = async (req, res, next) => {
  try {
    const savedLocations = await getLocations();

    res.status(200);
    return res.json(savedLocations);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error });
    return next(error);
  }
};

/**
 * Create new location || OCM Description
 * @public
 */
exports.createLocation = async (req, res, next) => {
  try {
    const user = await User.get(req.body.userId);
    console.log('req.body', req.body, 'user', user);
    const cpoOwnedLocation = await new Location({
      party_id: user.firstname,
      location_name: req.body.name,
      coordinates: {
        latitude: req.body.position.latitude,
        longitude: req.body.position.longitude,
      },
      telephone_operateur: req.body.telephone_operateur,
      location_type: req.body.location_type,
      payment_by_card: req.body.payment_by_card,
      condition_acces: req.body.condition_acces,
      bookable: req.body.bookable,
      connection: req.body.connection,
      address: req.body.address,
      city: req.body.city,
      postal_code: req.body.postal_code,
      owner: user,
    });

    const savedCpoOwnedLocation = await cpoOwnedLocation.save();

    await createCpoLocation(cpoOwnedLocation);

    res.status(httpStatus.CREATED);

    console.log(savedCpoOwnedLocation.owner);
    return res.json(savedCpoOwnedLocation);
  } catch (error) {
    return next();
  }
};

/**
 * Delete location
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const oldLocation = await Location.get(req.query.locationId);
    const userId = req.query.userId;

    oldLocation
      .remove()
      .then(() => res.status(httpStatus.NO_CONTENT))
      .catch(e => next(e));

    // .end()

    return res.json(userId);
  } catch (error) {
    return next();
  }
};
// exports.createLocation = async (req, res, next) => {
//   try {
//     const user = await User.get(req.body.userId);
//     console.log('req.body', req.body, 'user', user);
//     const cpoOwnedLocation = await new Location({
//       party_id: user.firstname,
//       location_name: req.body.name,
//       coordinates: {
//         latitude: req.body.position.latitude,
//         longitude: req.body.position.longitude,
//       },
//       telephone_operateur: req.body.telephone_operateur,
//       location_type: req.body.location_type,
//       payment_by_card: req.body.payment_by_card,
//       condition_acces: req.body.condition_acces,
//       bookable: req.body.bookable,
//       connection: req.body.connection,
//       address: req.body.address,
//       city: req.body.city,
//       postal_code: req.body.postal_code,
//       owner: user,
//     });

//     const savedCpoOwnedLocation = await cpoOwnedLocation.save();

//     res.status(httpStatus.CREATED);

//     console.log(savedCpoOwnedLocation.owner);
//     return res.json(savedCpoOwnedLocation);
//   } catch (error) {
//     return next();
//   }
// };
