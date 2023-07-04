const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');
require('./pilot')
require('./system')
const events = require('./events');

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
    events.emit('new-flight', flight);
  }, 10000);

  events.on('arrived', (flight) => {
    console.log('Manager: we’re greatly thankful for the amazing flight,', flight.Details.pilot);
  });