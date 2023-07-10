'use strict';
require('dotenv').config();
const port = process.env.PORT || 3033;
const ioClient = require('socket.io-client');
let host = `http://localhost:${port}/`;
const systemConnection = ioClient.connect(host);
let host2 = `http://localhost:${port}/airline`;
const pilotConnection = ioClient.connect(host2);

systemConnection.on('new-flight', (flight) => { 

  setTimeout(() => {
    console.log('Pilot: flight with ID', flight.Details.flightID, 'took-off');
    flight.event = 'took_off';
    flight.time = new Date();
    pilotConnection.emit('took-off', flight);
//------------------------------------------

systemConnection.emit('get-all')
systemConnection.on('flight', (flight)=>{
console.log('Pilot:Sorry i didnt catch this flight ID',flight.id)
systemConnection.emit('recieved', flight)
});

  }, 4000);

  setTimeout(() => {
    console.log('Pilot: flight with ID', flight.Details.flightID, 'has arrived');
    flight.event = 'arrived';
    flight.time = new Date();
    systemConnection.emit('arrived', flight);
  }, 7000);
});

