'use strict';
// This is the Vendor Module:

// Monitor the system for events …

require('dotenv').config();
const event = require('./events.js');
const faker = require('faker');
require('../caps.js');

function makeAnOrder() {
    let storeName = process.env.STORE_NAME; // Declare your store name (perhaps in a .env file, so that this module is re-usable)
    let orderID = Math.ceil(Math.random() * 5000); // Every 5 seconds, simulate a new customer order
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
    event.emit('package has been picked up by carrier', fakeOrder);
};
// TODO: Whenever the ‘delivered’ event occurs
    // Log “thank you” to the console

function placeAnOrder() {

;}