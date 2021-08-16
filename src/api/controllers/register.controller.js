const { setParty, healthCheck, handshake } = require('../services/registryProvider');


exports.set = async (req, res, next) => {
  try {
    const registration = await setParty();
    return res.send(registration);
  } catch (error) {
    return next(error);
  }
};


exports.health = async (req, res, next) => {
  try {
    const health = await healthCheck();
    return res.send(health);
  } catch (error) {
    return next(error);
  }
};


exports.handshake = async (req, res, next) => {
  try {
    const registration = await handshake();
    return res.send(registration);
  } catch (error) {
    return next(error);
  }
};
