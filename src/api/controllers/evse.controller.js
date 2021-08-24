const { getEvses } = require('../services/evseProvider');
const Evse = require('../models/evse.model');

exports.load = async (req, res, next) => {
  try {
    const evses = await getEvses();
    const savedEvses = [];
    evses.forEach(evse => {
      savedEvses.push(
        new Evse({
          evse_id: evse.evse_id,
          status: evse.status,
        }),
      );
    });
    res.json(savedEvses);
  } catch (error) {
    return next(error);
  }
};
