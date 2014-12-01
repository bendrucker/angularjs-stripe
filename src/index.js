'use strict';

module.exports = require('angular')
  .module('angular-stripe', [])
  .provider('stripe', require('./provider'))
  .name;
