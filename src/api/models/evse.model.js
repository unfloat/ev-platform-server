const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Evse Schema
 * @private
 */
const evseSchema = new mongoose.Schema({
  evse_id: {
    type: String,
  },
  status: {
    type: String,
  },
  connectors: [{ type: Schema.Types.ObjectId, ref: 'Connector' }],
});

evseSchema.pre('save', async next => {
  try {
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * @typedef Evse
 */
module.exports = mongoose.model('Evse', evseSchema);
