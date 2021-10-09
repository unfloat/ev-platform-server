/* eslint-disable consistent-return */
const axios = require('axios');
const Evse = require('../models/evse.model');
const Connector = require('../models/connector.model');
const Location = require('../models/location.model');
const fs = require('fs');
// async
exports.getLocations = async (latitude, longitude, distance) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };
    const parameters = {
      latitude,
      longitude,
      distance,
    };
    const locations = await axios.get(process.env.OPEN_API_URL, {
      headers,
      parameters,
    });

    return locations.data;
  } catch (error) {
    return error;
  }
};

/*
      twenty_four_seven: location.opening_times.twentyfourseven
        ? location.opening_times.twentyfourseven
        : false,
      is_green_energy: location.energy_mix.is_green_energy, 
      */
exports.saveLocations = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-ID': '1',
      'X-Correlation-ID': '1',
      'X-API-Key': process.env.OPEN_API_KEY,
    };
    const locations = await axios.get(process.env.OPEN_API_URL, {
      headers,
    });
  } catch (error) {
    return error;
  }
  let formattedLocations = [];
  for (let location of locations) {
    let newLocation = await new Location({
      party_id: location.party_id,
      location_name: location.station_name,
      coordinates: {
        latitude: location.Latitude,
        longitude: location.Longitude,
      },
      operator: location.OperatorInfo.Title,
      operator_website: location.OperatorInfo.WebsiteURL,
      company_name: location.company_name,
      contact_operator: location.OperatorInfo.PhonePrimaryContact,
      telephone_operateur: location.ContactTelephone1,
      location_type: location.location_type,
      payment_by_card: location.payment_by_card,
      condition_acces: location.UsageCost,
      bookable: location.bookable,
      connection: location.connection,
      address: location.AddressInfo.Title,
      city: location.city,
      free_charging: location.free_charging,
      is_green_energy: location.is_green_energy,
      tarif: location.UsageCost,
      two_wheel: location.two_wheel,
      twentyfourseven: location.twentyfourseven,
      status: location.StatusType.IsOperational,
      creation_date: location.creation_date,
      nominal_power: location.nominal_power,
      evses: await this.getEves(location),
      connectors: await this.getConnectors(location),
    }).save();

    formattedLocations.push(newLocation);
  }

  return formattedLocations;
};

exports.getEves = async location => {
  let formattedEvses = [];

  // for (let evse of location.evses) {
  //   console.log('provided evses', evse);

  try {
    let newEvse = await new Evse({
      evse_id: location.UUID,
      status: location.StatusType,
      verified_recently: location.IsRecentlyVerified,
      date_last_verified: location.DateLastVerified,
    }).save();

    formattedEvses.push(newEvse._id);
  } catch (err) {
    console.log(err);
  }

  return formattedEvses;
};

exports.getConnectors = async evse => {
  let formattedConnectors = [];

  for (let connector of location.Connections) {
    try {
      let newConnector = await new Connector({
        standard: connector.standard,
        format: connector.IsDiscontinued,
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
