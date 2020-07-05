'use strict';
// DRIVER MODULE
// Monitors the system for events …

const netModule = require('net');

//Instantiate a socket for driver to connect to...
const Client = new netModule.Socket();

// Connect to the CAPS server...
Client.connect(3000, 'localhost', () => {
    console.log('Driver has connected to Server');
});

// TODO:needs to be up so that it can accept and re-emit events, maybe dedicate a function to check incoming events?

// Listen for the data event coming in from the CAPS server...
Client.on('data', (buffer) => { // When data arrives,
    let data = JSON.parse(buffer.toString()); // parse it (it should be JSON)
    if (data.event === 'package sorted for pick-up') { // look for the event property,
        deliverAnOrder(data.payload); // and begin processing.
    };
});

function deliverAnOrder (data) {
    // console.log('CAPS driver payload', payload);
    setTimeout(function () {
        // Simulate picking up the package
        console.log(`DRIVER: picked up ${data.payload.orderID}`); // log pick up to console
        Client.write(JSON.stringify({ event: 'in-transit', payload: data.payload })); // Create a msg object wih event and payload as keys.

        setTimeout(function () {
            // Simulate delivering the package
            console.log(`delivered: ${data.payload.orderId}`); // log delivery to console
            Client.write(JSON.stringify({ event: 'delivered', payload: data.payload })); // Create a msg object wih event and payload as keys.
        }, 3000); // Wait 3 seconds (delivery)
    }, 1000); // Wait 1 second (pickup)
};

// export as module
// module.exports = deliverAnOrder;