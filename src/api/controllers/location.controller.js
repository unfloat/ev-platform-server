const { getLocations } = require('../services/locationProvider');
const Location = require('../models/location.model');
const Connector = require('../models/connector.model');
const Evse = require('../models/evse.model');

exports.load = async (req, res, next) => {
  try {
    const locations = await getLocations();
    const savedLocations = [];

    locations.data.forEach(location => {
      savedLocations.push(
        new Location({
          party_id: location.party_id,
          station_name: location.name,
          coordinates: {
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
          },
          address: location.address,
          city: location.city,
          postal_code: location.postal_code,
          operator: location.operator,
          twenty_four_seven: location.opening_times.twentyfourseven
            ? location.opening_times.twentyfourseven
            : false,
          is_green_energy: location.energy_mix.is_green_energy
            ? location.energy_mix.is_green_energy
            : false,
        }),
      );
    });
    console.log('savedLocations', savedLocations);
    return res.status(200).json(savedLocations);
  } catch (error) {
    res.status(500).json({ message: 'fuck off' });
    return next(error);
  }
};
