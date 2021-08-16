const { getEvses } = require('../services/evseProvider');


exports.load = async (req, res, next) => {
  try {
    const evses = await getEvses();
    const savedEvses = [];
    evses.forEach((evse)) => {
      savedConnectors.push(new Connector({
      standard: connector.standard,
      format: connector.format,
      power_type: connector.power_type,
      max_voltage: connector.max_voltage,
      max_amperage: connector.max_amperage,
      last_updated: connector.last_updated,
    }));
  }
    res.json(evses);
  } catch (error) {
    return next(error);
  }
};
