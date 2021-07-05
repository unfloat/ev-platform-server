/* eslint-disable consistent-return */
const axios = require('axios');


exports.getLocations = async () => {
  try {
    const header = {
      Authorization: 'Token 5df01c34-6a96-4cd5-ab5d-7d6d2950f8a8',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'OCPI-from-country-code': 'FR',
      'OCPI-from-party-id': 'BEV',
      'OCPI-to-country-code': 'CH',
      'OCPI-to-party-id': 'OCN',
    };
    const locations = await axios.get(
      'https://test-ocn.emobilify.com/ocpi/sender/2.2/locations',
      {
        headers: {
          header,
        },
      },
    );
    console.log('TEST', locations.data);
    return locations.data;
  } catch (error) {
    console.error(error);
  }
};

// exports.getLocation = async (locationID) => {
//   try {
//     const locations = await axios.get(
//       'https://test-ocn.emobilify.com/ocpi/sender/2.2/locations/${locationID}',
//       {
//         headers: {
//           header,
//         },
//       },
//     );
//     return locations.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
