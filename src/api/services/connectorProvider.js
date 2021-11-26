/* eslint-disable consistent-return */
const axios = require('axios');

// location, evse, connector (args)
exports.getConnectors = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    // Exact match on a given connection type id (comma separated list)
    // Example value:1,2,3
    const connectors = await axios.get(
      // `https://test-ocn.emobilify.com/ocpi/sender/2.2/locations/${location}/${evse}/${connector}`,
      'https://test-ocn.emobilify.com/ocpi/sender/2.2/connectiontypeid',

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
