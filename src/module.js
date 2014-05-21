angular.module('angular-stripe', [])
  .provider('stripe', require('./provider'));

module.exports = 'angular-stripe';