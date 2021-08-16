const Connector = require('../models/connector.model');
const { getConnectors } = require('../services/connectorProvider');


exports.load = async (req, res, next) => {
  try {
    const connectors = await getConnectors();
    const savedConnectors = [];
    connectors.forEach((connector) => {
      savedConnectors.push(new Connector({
        standard: connector.standard,
        format: connector.format,
        power_type: connector.power_type,
        max_voltage: connector.max_voltage,
        max_amperage: connector.max_amperage,
        last_updated: connector.last_updated,
      }));
    });
    console.log(savedConnectors);
    return res.json(savedConnectors);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new location
 * @public
 */
// exports.create = async (req, res, next) => {
//   try {
//     const locations = await getLocations();
//     locations.map(location => new Location(location));
//     return res.json(locations);
//   } catch (error) {
//     return error;
//   }
// };
