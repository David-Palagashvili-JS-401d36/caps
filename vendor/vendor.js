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

function buildAnOrder() { // this function creates the payload AKA order
    let orderID = faker.random.number(); // simulate a new customer via random order ID
    let clientName = faker.name.findName();
    let clientAddress = faker.fake(
        '{{address.streetAddress}}',
        '{{address.city}}',
        '{{address.state}}',
        '{{address.zip}}'
        ); // Create a fake order, as an object:
    let shipmentData = {
        store: storeName,
        orderID: orderID,
        customer: clientName,
        address: clientAddress
    }; // Create a message object with keys event and payload, carrying our order object.
    Client.write(JSON.stringify({ event: 'pickup', payload: shipmentData }));
};

function assignToDriver() {
    let orderCount = 0;
    while(orderCount < 3) { // for testing, only makes 3 orders -- I will likely modify this in later phases
        setTimeout(buildAnOrder, 5000); // Every 5 seconds, simulate new shipmentData
        orderCount = orderCount + 1;
    };
};

Client.on('data', validateEvent);

function validateEvent(buffer) {
    let data = JSON.parse(buffer.toString());
    // console.log(data);
    if (data.event === 'delivered') { // If the event is called delivered
        console.log(`Order ${data.payload.orderID} was successfully delivered. Thank you!`)
    }; // log a "thank you" msg
};

assignToDriver();

// Whenever the ‘delivered’ event occurs, takes in payload and:
// event.on('delivered successfully', (payload) => { // Logs success message to the console
//     console.log(`Order ${payload.orderID} was successfully delivered. Thank you!`)
// });

// export as module to use in caps
// module.exports = assignToDriver;