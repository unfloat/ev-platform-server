/* eslint-disable consistent-return */
const axios = require('axios');


exports.getLocations = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Token 08382f42-3b13-4e49-9d80-0181fda5ebd7',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'OCPI-from-country-code': 'FR',
      'OCPI-from-party-id': 'EVC',
      'OCPI-to-country-code': 'CH',
      'OCPI-to-party-id': 'CPO',
    };
    const locations = await axios.get(
      'https://test-ocn.emobilify.com/ocpi/sender/2.2/locations',
      {
        headers,
      },
    );
    return locations.data;
  } catch (error) {
    console.error(error);
  }
};

