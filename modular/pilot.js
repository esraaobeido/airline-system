require('./system')
require('./manager')
const events = require('./events');

events.on('new-flight', (flight) => {
    setTimeout(() => {
      console.log('Pilot: flight with ID', flight.Details.flightID, 'took-off');
      flight.event = 'took_off';
      flight.time = new Date();
      events.emit('took-off', flight);
    }, 4000);

    setTimeout(() => {
      console.log('Pilot: flight with ID', flight.Details.flightID, 'has arrived');
      flight.event = 'arrived';
      flight.time = new Date();
      events.emit('arrived', flight);
    }, 7000);
  });