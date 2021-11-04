const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

var Schema = mongoose.Schema;

/**
 * Vehicule Schema
 * @private
 */
const vehiculeSchema = new mongoose.Schema({
  brand: {
    type: String,
  },
  model: {
    type: String,
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
    type: String,
  },
  max_amperage: {
    type: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

/**
 * Statics
 */
vehiculeSchema.statics = {
  /**
   * Get vehicule
   *
   * @param {ObjectId} id - The objectId of vehicule.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let vehicule;

      if (mongoose.Types.ObjectId.isValid(id)) {
        vehicule = await this.findById(id).exec();
      }
      if (vehicule) {
        return vehicule;
      }

      throw new APIError({
        message: 'Vehicule does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('Vehicule', vehiculeSchema);
