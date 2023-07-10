'use strict';

require('dotenv').config();
const port = process.env.PORT || 3033;
const socket= require('socket.io');
const io = new socket.Server(port);
const { v4: uuid } = require('uuid');

const queue = {
  flights: {}
} 

io.on('connection', (newSocket)=>{
  console.log(`welcome to server socket , id: ${newSocket.id}`)
  
  newSocket.on('new-flight', (flight) => {
    console.log('Flight', flight);
    io.emit('new-flight', flight);

    const id = uuid();
    queue.flights[id]= flight;
    });
    

    newSocket.on('get-all',()=>{
      console.log("Queue V1", queue);
      Object.keys(queue.flights).forEach((id) => {
        io.emit('flight', {
          id : id,
          payload : queue.flights[id]
        })
      })
    });

    newSocket.on('recieved',(flight)=>{
      delete queue.flights[flight.id];
      console.log('flight deleted : Queue V2 ', queue);
     });

    newSocket.on('arrived', (flight) => {
      console.log('Flight', flight);
      io.emit('arrived', flight);
      
    }); 
})

//-------------- nameSpace--------------------------

const airLineSystem = io.of('/airline')

airLineSystem.on('connection', (newSocket)=>{
    console.log(`Airline sysyem connection, id: ${newSocket.id} `)
    newSocket.on('took-off', (flight) => {
    console.log('Flight', flight);
   });       
})