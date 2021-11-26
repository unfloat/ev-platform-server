/* eslint-disable consistent-return */
const axios = require('axios');

exports.getEvses = async (location, evse) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Exact match on a given EVSE operator id (comma separated list)
    // Example value:1,2,3
    const evses = await axios.get(
      `https://api.openchargemap.io/v3/poi?/operatorid=${evse}`,
      // /ocpi/sender/2.2/locations/LOC1/1234/1
      {
        headers,
      },
    );
    return evses.data;
  } catch (error) {
    console.error(error);
  }
};
