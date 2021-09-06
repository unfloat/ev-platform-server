const mongoose = require('mongoose');
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
});

/**
 * Methods
 */
vehiculeSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'brand',
      'model',
      'standard',
      'format',
      'power_type',
      'max_voltage',
      'max_amperage',
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

module.exports = mongoose.model('Vehicule', vehiculeSchema);
