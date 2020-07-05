'use strict';
require ('dotenv').config();
// Main Hub - CAPS Application Server:

// It has one job which is to accept all inbound events and data, validate them, and and then re-broadcast them to everyone except the sender. 
// USED CLASS EXAMPLE(ty Jacob Knaack): https://github.com/codefellows/seattle-javascript-401d36/blob/master/class-18/review/CAPS/caps/caps.js
// It doesn’t perform any logic other than to ensure that the inbound events are properly formatted before it broadcasts them.

const netModule = require('net');

//Declare a PORT to use for the hub
const PORT = process.env.PORT || 3000;

// Accept inbound TCP connections on the declared port
const server = net.createServer();

// Creates a pool of connected clients
const socketPool = {};

server.on('connection', (socket) => {
    const id = Math.floor(Math.random() * 100000000);
    socketPool[id] = socket;
    console.log(`Connection established at:: ${id}`);
    socket.on('error', (e) => console.log(e));
    socket.on('end', () => { delete socketPool[id]; });
    socket.on('data', handleMessage);
});