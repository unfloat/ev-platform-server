/* eslint-disable consistent-return */
const axios = require('axios');


exports.getConnectors = async (location, evse, connector) => {
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
    const connectors = await axios.get(
      `https://test-ocn.emobilify.com/ocpi/sender/2.2/locations/${location}/${evse}/${connector}`,
      {
        headers,
      },
    );
    return connectors;
  } catch (error) {
    console.error(error);
  }
};

