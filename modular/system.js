const eventEmitter = require('./events');
require('./pilot')
require('./manager')


eventEmitter.on('new-flight', (flight) => {
    console.log('Flight', flight);
  });

  eventEmitter.on('took-off', (flight) => {
    console.log('Flight', flight);
  });

  eventEmitter.on('arrived', (flight) => {
    console.log('Flight', flight);
  });