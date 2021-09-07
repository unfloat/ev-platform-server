/* eslint-disable consistent-return */
const axios = require('axios');
const Evse = require('../models/evse.model');
const Connector = require('../models/connector.model');
const Location = require('../models/location.model');

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

    // Open Charge Network

    return locations.data;

    // const formattedLocations = [];
    // const formattedEvses = [];

    // console.log(formattedLocations, formattedEvses, formattedConnectors);
  } catch (error) {
    console.error(error);
  }
};

exports.saveLocations = async () => {
  let locations = await this.getLocations();
  let formattedLocations = [];
  for (let location of locations.data) {
    let newLocation = await new Location({
      party_id: location.party_id,
      station_name: location.name,
      coordinates: {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      },
      address: location.address,
      city: location.city,
      postal_code: location.postal_code,
      operator: location.operator.name,
      twenty_four_seven: location.opening_times.twentyfourseven
        ? location.opening_times.twentyfourseven
        : false,
      is_green_energy: location.energy_mix.is_green_energy,
      evses: await this.getEves(location),
    }).save();

    formattedLocations.push(newLocation);
  }
  return formattedLocations;
};

exports.getEves = async location => {
  let formattedEvses = [];

  for (let evse of location.evses) {
    console.log('provided evses', evse);

    try {
      let newEvse = await new Evse({
        evse_id: evse.evse_id,
        status: evse.status,
        connectors: await this.getConnectors(evse),
      }).save();

      formattedEvses.push(newEvse._id);
    } catch (err) {
      console.log(err);
    }
  }
  return formattedEvses;
};

exports.getConnectors = async evse => {
  let formattedConnectors = [];

  for (let connector of evse.connectors) {
    try {
      let newConnector = await new Connector({
        standard: connector.standard,
        format: connector.format,
        power_type: connector.power_type,
        max_voltage: connector.max_voltage,
        max_amperage: connector.max_amperage,
      }).save();
      console.log('newConnector', newConnector);

      formattedConnectors.push(newConnector._id);
    } catch (err) {
      console.log(err);
    }
  }
  console.log('formattedConnectors inside getConnectors', formattedConnectors);
  return formattedConnectors;
};
