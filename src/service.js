'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

var internals = {};

internals.promisify = function (receiver, method) {
  var $q = internals.$q;
  return  function (data) {
    var deferred = $q.defer();
    receiver[method](data, function (status, response) {
      if (response.error) return deferred.reject(response.error);
      return deferred.resolve(response);
    });
    return deferred.promise;
  };
};

internals.wrap = function (source, options) {
  var angularStripe = {};
  angular.forEach(options, function (methods, receiver) {
    var destination = receiver ? angularStripe[receiver] = {} : angularStripe;
    receiver = receiver ? Stripe[receiver] : Stripe;
    /* istanbul ignore else */
    if (methods.promisify) angular.forEach(methods.promisify, function (method) {
      destination[method] = internals.promisify(receiver, method);
    });
    if (methods.reference) angular.forEach(methods.reference, function (method) {
      destination[method] = receiver[method];
    });
  });
  return angularStripe;
};

module.exports = [
  '$q',
  function ($q) {
    internals.$q = $q;

    return internals.wrap(Stripe, {
      '': {
        promisify: ['getToken']
      },
      card: {
        reference: ['validateCardNumber', 'validateExpiry', 'validateCVC', 'cardType'],
        promisify: ['createToken']
      },
      bankAccount: {
        reference: ['validateRoutingNumber', 'validateAccountNumber'],
        promisify: ['createToken']
      }
    });
  }
];
