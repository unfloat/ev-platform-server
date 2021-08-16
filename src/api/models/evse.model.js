const mongoose = require('mongoose');
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

});

evseSchema.pre('save', async (next) => {
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
