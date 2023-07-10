'use strict';

require('dotenv').config();
const port = process.env.PORT || 3030;
const socket= require('socket.io');
const io = new socket.Server(port);

io.on('connection', (newSocket)=>{
  console.log(`welcome to server socket , id: ${newSocket.id}`)
  
  newSocket.on('new-flight', (flight) => {
      console.log('Flight', flight);
      io.emit('new-flight', flight)
    });
    
    newSocket.on('arrived', (flight) => {
      console.log('Flight', flight);
      io.emit('arrived', flight)

      
    });
})

const airLineSystem = io.of('/airline')

airLineSystem.on('connection', (newSocket)=>{
    console.log(`airline sysyem connection, id: ${newSocket.id} `)
    newSocket.on('took-off', (flight) => {
    console.log('Flight', flight);
   });       
})