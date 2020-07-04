'use strict';
// Drivers Module

// Monitor the system for events …

// Log “delivered” to the console
// Emit a ‘delivered’ event with the same payload

const event = require('./events.js');
require('../caps.js');

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
// On the ‘pickup’ event …
function deliverAnOrder (payload) { // take in payload (carries the fake order)
    setTimeout(function() { 
        console.log(`DRIVER: picked up ${payload.orderID}`); // Log the ‘pickup’ event
        event.emit('in-transit', payload); // Emit an ‘in-transit’ event with the payload you received
    }, 1000); // Emit after waiting 1 second
    setTimeout(function() { 
        event.emit('delivered', payload); // Emit a ‘delivered’ event with the same payload
    }, 3000); // Emit after waiting 3 seconds, oh my that's a fast driver!
};
// on pick up event, trigger callback fn, signaling that the Driver is handling the package.
event.on('package picked up', deliverAnOrder);