'use strict';
// Main Hub Application:
// Manages the state of every package (ready for pickup, in transit, delivered, etc)
const event = require('lib/events.js');

require ('dotenv').config();
require('lib/events.js');
require('lib/vendor.js');

// engaging our vendor module
const runShipments = require('./lib/vendor.js');

// The following listener, logs every event to the console with a timestamp & payload, then emits the trigger for the next event.
event.on('package sorted for pick-up', (payload) => {
    let timeStamp = new Date();
    console.log( {EVENT: 'ready for pickup', timeStamp, payload} );
    event.emit('package scanned, assigned to driver', payload);
});
// Simulate a driver embarking on their route with the package on-board.
event.on('in-transit', (payload) => {
    let timeStamp = new Date();
    console.log( {EVENT: 'in transit', timeStamp, payload} );
    event.emit('package is in transit', payload);   
});

event.on('delivered', (payload) => {
    let timeStamp = new Date();
    console.log( {EVENT: 'delivered', timeStamp, payload} );
    event.emit('delivered successfully', payload);   
});
// intiate shipping operations by calling our function.
runShipments();