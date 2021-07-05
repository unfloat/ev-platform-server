const Joi = require('joi');
const Location = require('../models/location.model');

module.exports = {

  // GET /v1/users
  listLocations: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      // name: Joi.string(),
      // email: Joi.string(),
      // role: Joi.string().valid(User.roles),
    },
  },
};
