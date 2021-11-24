const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
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
  creation_date: {
    type: String,
  },
  nominal_power: {
    type: Number,
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
  status: {
    type: Boolean,
  },
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
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

locationSchema.pre('save', async function save(next) {
  try {
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Statics
 */
locationSchema.statics = {
  /**
   * Get location
   *
   * @param {ObjectId} id - The objectId of location.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let location;

      if (mongoose.Types.ObjectId.isValid(id)) {
        location = await this.findById(id).exec();
      }
      if (location) {
        return location;
      }

      throw new APIError({
        message: 'Location does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

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
