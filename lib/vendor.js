'use strict';

// Vendor Module:

// Declare your store name (perhaps in a .env file, so that this module is re-usable)
// Every 5 seconds, simulate a new customer order
    // Create a fake order, as an object:
        // storeName, orderId, customerName, address
    // Emit a ‘pickup’ event and attach the fake order as payload
        // HINT: Have some fun by using the faker library to make up phony information
// Monitor the system for events …
    // Whenever the ‘delivered’ event occurs
        // Log “thank you” to the console

require('dotenv').config();
const event = require('./events.js');
const faker = require('faker');
require('../caps.js');

function makeAnOrder() {
    let storeName = process.env.STORE_NAME;
    let orderID = Math.ceil(Math.random() * 5000); // Every 5 seconds, simulate a new customer order
    let clientName = faker.name.findName();
    let clientAddress = faker.fake(
        '{{client.streetAddress}}',
        '{{client.city}}',
        '{{client.state}}',
        '{{client.zip}}'
    ); // Create a fake order, as an object:
    let orderFake = {
        store: storeName,
        orderID: orderID,
        customer: clientName,
        address: clientAddress
    };
};

function placeAnOrder() {

;}