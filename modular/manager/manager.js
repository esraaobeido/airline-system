'use strict'
require('dotenv').config()
const port = process.env.PORT || 3033;
const ioClient = require('socket.io-client');
let host = `http://localhost:${port}/`;
const managerConnection = ioClient.connect(host);
const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

  setInterval(() => {
      const flightId = uuidv4();
      const destination = faker.location.city();
      const pilotName = faker.person.firstName();
      
      const flight = {
        event: 'new-flight',
        time: new Date(),
        Details: {
          airLine: 'Royal Jordanian Airlines',
          destination: destination,
          pilot: pilotName,
          flightID: flightId,
        },
      };

    console.log('Manager: new flight with ID', flightId, 'has been scheduled');
  managerConnection.emit('new-flight', flight);
  }, 10000);

  // managerConnection.on('added Successfully', () => {
  //   console.log('Thank you for adding')
  // })

  managerConnection.on('arrived', (flight) => {
    console.log('Manager: we’re greatly thankful for the amazing flight,', flight.Details.pilot);
  });

