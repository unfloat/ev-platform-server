const { getLocations } = require('../services/locationProvider');
const Location = require('../models/location.model');
const Connector = require('../models/connector.model');
const Evse = require('../models/evse.model');

exports.load = async (req, res, next) => {
  try {
    const locations = await getLocations();
    const savedLocations = [];
    const savedEvses = [];
    const savedConnectors = [];

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

      location.evses.forEach(evse => {
        savedEvses.push(
          new Evse({
            evse_id: evse.evse_id,
            status: evse.status,
          }),
        );
        evse.savedConnectors.forEach(connector => {
          savedConnectors.push(
            new Connector({
              standard: connector.standard,
            }),
          );
        });
      });
    });
    console.log('savedConnectors', savedConnectors, 'savedEvses', savedEvses);
    // return res.json(savedLocations);
  } catch (error) {
    return next(error);
  }
};
