'use strict';
// This is the Vendor Module:

// Monitor the system for events …

require('dotenv').config();
const event = require('./events.js');
const faker = require('faker');
require('../caps.js');

function buildAnOrder() { // this function creates the order object
    let storeName = process.env.STORE_NAME; // Declare your store name (perhaps in a .env file, so that this module is re-usable)
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
    event.emit('package picked up', fakeOrder);
};

function placeTheOrder() {
    let orderCount = 0;
    while(orderCount < 3) { // for testing, only makes 3 orders -- I will likely modify this in later phases
        setTimeout(buildAnOrder, 5000); // Every 5 seconds, simulate a new fakeOrder
        orderCount = orderCount + 1;
    };
};
// Whenever the ‘delivered’ event occurs, takes in payload and:
event.on('delivered', (payload) => { // Logs success message to the console
    console.log(`Order ${payload.orderID} was delivered successfully. Thank you!`)
});
// export as module to use in caps
module.exports = placeTheOrder;