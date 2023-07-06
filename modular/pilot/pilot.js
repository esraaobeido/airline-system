'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const ioClient = require('socket.io-client');
let host = `http://localhost:${port}/`;
const systemConnection = ioClient.connect(host);
let host2 = `http://localhost:${port}/airline`;
const pilotConnection = ioClient.connect(host2);

systemConnection.on('new-flight', (flightDetails) => { 
  setTimeout(() => {
    console.log('Pilot: flight with ID', flight.Details.flightID, 'took-off');
    flight.event = 'took_off';
    flight.time = new Date();
    pilotConnection.emit('took-off', flight);
  }, 4000);

  setTimeout(() => {
    console.log('Pilot: flight with ID', flight.Details.flightID, 'has arrived');
    flight.event = 'arrived';
    flight.time = new Date();
    systemConnection.emit('arrived', flight);
  }, 7000);
});

// pilotConnection.on('connect', () => {
//   console.log('Connected to airline server namespace');
  
//   // After 4 seconds, alert flight took-off event and log the flight event with its ID
//   setTimeout(() => {
//     console.log('Pilot: flight took-off');
//     const flight = {
//       event: 'took_off',
//       time: new Date(),
//       details: {
//         airLine: 'Royal Jordanian Airlines',
//         destination: 'Manchester, UK',
//         pilot: 'Jane doe',
//         flightID: 'ds7g86sa8v87dsv60v876d',
//       },
//     };
//     console.log('Flight', flight);
//   }, 4000);

//   // Notify the pilot when a new flight is scheduled
//   pilotConnection.on('new-flight', (flight) => {
//     console.log('Pilot: new flight scheduled');
//     console.log('Flight', flight);
//   });

//   // After 3 seconds more, alert when a flight arrived and log the flight event with its ID
//   setTimeout(() => {
//     console.log('Pilot: flight arrived');
//     const flight = {
//       event: 'arrived',
//       time: new Date(),
//       details: {
//         airLine: 'Royal Jordanian Airlines',
//         destination: 'Manchester, UK',
//         pilot: 'Jane doe',
//         flightID: 'ds7g86sa8v87dsv60v876d',
//       },
//     };
//     console.log('Flight', flight);
//   }, 7000);
// });

