/* eslint-disable consistent-return */
const axios = require('axios');

// (userLatitude, userLongitude)
exports.getLocationsByUserGeolocationProvider = async parameters => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };

    console.log('provider here?', parameters);

    const params = {
      latitude: parameters.latitude,
      longitude: parameters.longitude,
      maxresults: 20,
      distance: 5,
      distanceunit: 'KM',
      connectiontypeid: parameters.connectiontypeid,
    };

    const locations = await axios.get(process.env.OPEN_API_URL, {
      headers,
      params,
    });
    return locations.data;
  } catch (error) {
    return error;
  }
};
exports.getLocationsByConnectorTypeProvider = async parameters => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };

    const params = {
      latitude: parameters.latitude,
      longitude: parameters.longitude,
      maxresults: 10,
      distance: 5,
      distanceunit: 'KM',
      connectiontypeid: parameters.connectiontypeid,
    };

    // console.log('provider here?', parameters);

    const locations = await axios.get(process.env.OPEN_API_URL, {
      headers,
      params,
    });
    return locations.data;
  } catch (error) {
    return error;
  }
};

// { latitude, longitude }
exports.getLocationsProvider = async parameters => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };

    const params = {
      latitude: parameters.latitude,
      longitude: parameters.longitude,
      maxresults: 100,
      distance: 100,
      distanceunit: 'KM',
    };

    console.log('params', params);

    const locations = await axios.get(process.env.OPEN_API_URL, {
      headers,
      params,
    });

    console.log('getLocationsProvider');
    return locations.data;
  } catch (error) {
    return error;
  }
};
exports.createCpoLocation = async location => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };

    const params = {
      latitude: parameters.latitude,
      longitude: parameters.longitude,
      maxresults: 1,
      distance: 100,
      distanceunit: 'KM',
    };

    console.log('params', params);

    const locations = await axios.post(process.env.OPEN_API_URL, {
      headers,
      params,
    });

    console.log('getLocationsProvider');
    return locations.data;
  } catch (error) {
    return error;
  }
};
