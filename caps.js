'use strict';
// Main Hub Application
// Manages the state of every package (ready for pickup, in transit, delivered, etc)
// Logs every event to the console with a timestamp and the event payload
// i.e. “EVENT {}”

const event = require('lib/events.js');

require ('dotenv').config();
require('lib/events.js');
require('lib/vendor.js');
// engaging our vendor module
const shipPackage = require('./lib/vendor.js');
// should listen for 