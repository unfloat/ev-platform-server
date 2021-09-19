const { getLocations, saveLocations } = require('../services/locationProvider');
const Location = require('../models/location.model');
const Connector = require('../models/connector.model');
const Evse = require('../models/evse.model');

exports.getLocations = async (req, res, next) => {
  try {
    let locations = await Location.find().populate({
      path: 'evses',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'connectors' },
    });
    console.log(locations);
    res.status(200);

    return res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error });
    return next(error);
  }
};

exports.getCPOLocation = async (req, res, next) => {
  try {
    let locations = await Location.find().populate({
      path: 'evses',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'connectors' },
    });
    console.log(locations);
    res.status(200);

    return res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error });
    return next(error);
  }
};

exports.saveAndFormatLocations = async (req, res, next) => {
  try {
    const savedLocations = await saveLocations();
    res.status(200).json(savedLocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
    //  return next(error);
  }
};
