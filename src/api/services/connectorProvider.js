/* eslint-disable consistent-return */
const axios = require('axios');

// location, evse, connector (args)
exports.getConnectors = async () => {
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
      // `https://test-ocn.emobilify.com/ocpi/sender/2.2/locations/${location}/${evse}/${connector}`,
      'https://test-ocn.emobilify.com/ocpi/sender/2.2/locations',

      {
        headers,
      },
    );
    console.log(connectors);
    // connectors.data.evses.forEach(element => {
    //   console.log('connectors.data', element.connectors);
    // });
    return connectors.data;
  } catch (error) {
    console.error(error);
  }
};
