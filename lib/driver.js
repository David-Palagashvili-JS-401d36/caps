'use strict';
// Drivers Module

// Monitor the system for events …

// Wait 1 second
// Log “DRIVER: picked up [ORDER_ID]” to the console.
// Emit an ‘in-transit’ event with the payload you received
// Wait 3 seconds
// Log “delivered” to the console
// Emit a ‘delivered’ event with the same payload

const event = require('./events.js');
require('../caps.js');

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
// On the ‘pickup’ event …
function pickUp (payload) { // take in payload (carries the fake order)
    setTimeout(function() { 
        console.log(`DRIVER: picked up ${ORDER_ID}`); // Log the ‘pickup’ event
        event.emit('in-transit', payload);
    }, 1000); // Wait 1 second
};