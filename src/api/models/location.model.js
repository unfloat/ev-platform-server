const mongoose = require('mongoose');
/**
 * Location Schema
 * @private
 */
const locationSchema = new mongoose.Schema({
  country_code: {
    type: String,
  },
  station_name: {
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
  operator: {
    type: String,
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
    longitude: {
      type: String,
    },
  },
  // opening_times: {
  //   type: String,
  // },
  // add opening_time child class
  twentyfourseven: {
    type: Boolean,
  },
  is_green_energy: {
    type: Boolean,
  },
  // energy_sources: {
  //   source: {
  //     type: String,
  //   },
  //   percentage: {
  //     type: Number,
  //   },
  // },
  // add energy_source child class
});

locationSchema.pre('save', async function save(next) {
  try {
    return next();
  } catch (error) {
    return next(error);
  }
});

// locationSchema.method({
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
 * @typedef Location
 */
module.exports = mongoose.model('Location', locationSchema);
