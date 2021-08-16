const mongoose = require('mongoose');
/**
 * Connector Schema
 * @private
 */
const connectorSchema = new mongoose.Schema({
  standard: {
    type: String,
  },
  format: {
    type: String,
  },
  power_type: {
    type: String,
  },
  max_voltage: {
    type: Number,
  },
  max_amperage: {
    type: Number,
  },
  last_updated: {
    type: Date,
  },

});

connectorSchema.pre('save', async (next) => {
  try {
    return next();
  } catch (error) {
    return next(error);
  }
});


/**
 * @typedef Connector
 */
module.exports = mongoose.model('Connector', connectorSchema);
