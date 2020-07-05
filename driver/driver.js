'use strict';
// DRIVER MODULE
// Monitors the system for events …

const net = require('net');

//Instantiate a socket for driver to connect to...
const Client = new net.Socket();

// Connect to the CAPS server...
Client.connect(3000, 'localhost', () => {
    console.log('Driver has connected to Server');
});

// Listen for the data event coming in from the CAPS server...
Client.on('data', (buffer) => {
    let message = JSON.parse(buffer.toString());
    if (message.event === 'package-ready-for-delivery') {
      handleGoGetPackage(message.payload);
    };
});

// on pick up event, trigger callback fn, signaling that the Driver is handling the package.
event.on('package scanned, assigned to driver', deliverAnOrder);