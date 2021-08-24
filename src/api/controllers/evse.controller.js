const { getLocations } = require('../services/locationProvider');
const Evse = require('../models/evse.model');

exports.load = async (req, res, next) => {
  try {
    const locations = await getLocations();
    const savedEvses = [];
    locations.data.forEach(location => {
      location.evses.forEach(evse => {
        savedEvses.push(
          new Evse({
            evse_id: evse.evse_id,
            status: evse.status,
          }),
        );
      });
    });
    return res.status(200).json(savedEvses);
  } catch (error) {
    return next(error);
  }
};
