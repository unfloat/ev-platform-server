const mongoose = require('mongoose');
/**
 * Position Schema
 * @private
 */
const positionSchema = new mongoose.Schema({
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
    longitude: {
      type: String,
    },
  },
});

positionSchema.pre('save', async function save(next) {
  try {
    return next();
  } catch (error) {
    return next(error);
  }
});

// positionSchema.method({
//   transform() {
//     const transformed = {};
//     const fields = ['country_id', 'party_id', 'station_name', 'address', 'city', 'postal_code'];
//     fields.forEach((field) => {
//       transformed[field] = this[field];
//     });

//     return transformed;
//   },

// });

/**
 * @typedef Position
 */
module.exports = mongoose.model('Position', positionSchema);
