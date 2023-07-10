'use strict'
const port = process.env.PORT || 3031;
const ioClient = require('socket.io-client');
let host = `http://localhost:${port}/`;
const managerConnection = ioClient.connect(host);

const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

managerConnection.on('connect', () => {
  console.log('Connected to the socket.io server as a client.');

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

  managerConnection.on('arrived', (flight) => {
    console.log('Manager: we’re greatly thankful for the amazing flight,', flight.Details.pilot);
  });
});
