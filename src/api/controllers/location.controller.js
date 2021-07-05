const { getLocations } = require('../services/locationProvider');
// const { healthCheck } = require('../services/registryProvider');


exports.load = async (req, res, next) => {
  try {
    const locations = await getLocations();
    // const health = await healthCheck();
    // console.log(health);
    return res.send(locations);
  } catch (error) {
    return next(error);
  }
};
