const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
});

connectorSchema.pre('save', async next => {
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
