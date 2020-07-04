'use strict';
// Main Hub Application

// TODO: Logs every event to the console with a timestamp and the event payload
// i.e. “EVENT {}”

const event = require('lib/events.js');

require ('dotenv').config();
require('lib/events.js');
require('lib/vendor.js');

// engaging our vendor module
const runShipments = require('./lib/vendor.js');

// Manages the state of every package (ready for pickup, in transit, delivered, etc)
event.on('package sorted for pick-up', (payload) => {
    let timeStamp = new Date();
    console.log( {EVENT: 'ready for pickup', timeStamp, payload} );
    event.emit('package scanned, assigned to driver', payload);
});

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
// intiate operations by calling the function.
runShipments();