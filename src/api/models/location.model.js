const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Location Schema
 * @private
 */
const locationSchema = new mongoose.Schema({
  country_code: {
    type: String,
  },
  location_name: {
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
  contact_operator: {
    type: String,
  },
  telephone_operateur: {
    type: String,
  },
  location_type: {
    type: String,
  },
  condition_acces: {
    type: String,
  },
  connection: {
    type: String,
  },
  tarif: {
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
  twentyfourseven: {
    type: String,
  },
  is_green_energy: {
    type: Boolean,
  },
  free_charging: {
    type: Boolean,
  },
  bookable: {
    type: Boolean,
  },
  two_wheel: {
    type: Boolean,
  },
  payment_by_card: {
    type: Boolean,
  },
  evses: [{ type: Schema.Types.ObjectId, ref: 'Evse' }],
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
