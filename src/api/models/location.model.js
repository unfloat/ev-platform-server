const mongoose = require('mongoose');
/**
 * Location Schema
 * @private
 */
const locationSchema = new mongoose.Schema({
  country_code: {
    type: String,
  },
  party_id: {
    type: String,
  },
  id: {
    type: String,
  },
  publish: {
    type: Boolean,
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  country: {
    type: String,
  },
  coordinates: {
    latitude: {
      type: String,
    },
    longitude:
    {
      type: String,
    },
  },
});


/**
 * @typedef Location
 */
module.exports = mongoose.model('Location', locationSchema);
