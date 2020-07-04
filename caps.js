'use strict';
// Main Hub Application

// TODO: Logs every event to the console with a timestamp and the event payload
// i.e. “EVENT {}”

const event = require('lib/events.js');

require ('dotenv').config();
require('lib/events.js');
require('lib/vendor.js');
// engaging our vendor module
const shipPackage = require('./lib/vendor.js');
// Manages the state of every package (ready for pickup, in transit, delivered, etc)
// TODO: Set up listeners for each event:
event.on('package sorted for pick-up', (payload) => {
    let timeStamp = new Date();
    console.log( {EVENT: 'ready for pickup', timeStamp, payload} );
    event.emit('package scanned and assigned to driver', payload);
});