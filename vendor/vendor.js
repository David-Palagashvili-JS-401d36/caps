'use strict';
// VENDOR MODULE:
// Monitors the system for the "delivered" event …

require('dotenv').config();
const netModule = require('net');
const faker = require('faker');

 // Declare our store name in the .env file
const storeName = process.env.STORE_NAME || 'Sample Store';

// Connect to the hub server...
const Client = new netModule.Socket();
Client.connect(3000, 'localhost', () => {
    console.log('Vendor has connected to Server');
});

function buildAnOrder() { // this function creates the order object
    
    let orderID = Math.ceil(Math.random() * 4000); // simulate a new customer via random order ID
    let clientName = faker.name.findName();
    let clientAddress = faker.fake(
        '{{client.streetAddress}}',
        '{{client.city}}',
        '{{client.state}}',
        '{{client.zip}}'
        ); // Create a fake order, as an object:
    let fakeOrder = {
        store: storeName,
        orderID: orderID,
        customer: clientName,
        address: clientAddress
    }; // Emit a ‘pickup’ event and attach the fake order as payload
    event.emit('package sorted for pick-up', fakeOrder);
};

function assignToDriver() {
    let orderCount = 0;
    while(orderCount < 3) { // for testing, only makes 3 orders -- I will likely modify this in later phases
        setTimeout(buildAnOrder, 5000); // Every 5 seconds, simulate a new fakeOrder
        orderCount = orderCount + 1;
    };
};

// Whenever the ‘delivered’ event occurs, takes in payload and:
event.on('delivered successfully', (payload) => { // Logs success message to the console
    console.log(`Order ${payload.orderID} was successfully delivered. Thank you!`)
});

// export as module to use in caps
module.exports = assignToDriver;