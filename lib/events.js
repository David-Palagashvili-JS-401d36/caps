'use strict';
// This will be the Global Event Pool, shared by all modules

const EventEmitter = require('event');

const event = new EventEmitter();

module.exports = event;