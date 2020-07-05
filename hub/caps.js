'use strict';
require ('dotenv').config();
// Main Hub - CAPS Application Server:

// It has one job which is to accept all inbound events and data, validate them, and and then re-broadcast them to everyone except the sender. 
// USED CLASS EXAMPLE(ty Jacob Knaack): https://github.com/codefellows/seattle-javascript-401d36/blob/master/class-18/review/CAPS/caps/caps.js
// It doesn’t perform any logic other than to ensure that the inbound events are properly formatted before it broadcasts them.

const netModule = require('net');

// Declare a PORT to use for the hub
const PORT = process.env.PORT || 3000;

// Accept inbound TCP connections on the declared port
const server = net.createServer();

// Creates a pool of connected clients
const socketPool = {};

// On new connections, add the client to the connection pool
server.on('connection', (socket) => {
    const id = Math.floor(Math.random() * 100000000);
    socketPool[id] = socket;
    console.log(`Connection established at:: ${id}`);
    socket.on('data', handleData);
    socket.on('error', (error) => console.log(error));
    socket.on('end', () => { delete socketPool[id] });
});

// Error Logger
server.on('error', (error) => {
    console.log(`SERVER ERROR found at:: ${error}`);
});

//On incoming data from a client
function handleData(buffer) {
    let data = JSON.parse(buffer.toString());
    console.log('cap server message', message);
    if (message.event && message.payload) {
      logger(message.payload);
      for (let socket in socketPool) {
        socketPool[socket].write(JSON.stringify(message));
      };
    };
};