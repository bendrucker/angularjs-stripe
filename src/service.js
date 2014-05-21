'use strict';

var Stripe = require('stripe');

var internals = {};

internals.promisify = function (receiver, method, $q) {
  return function (data) {
    var deferred = $q.defer();
    receiver[method](data, function (status, response) {
      if (response.error) return deferred.reject(response.error);
      return deferred.resolve(response);
    });
    return deferred.promise;
  };
};

module.exports = [
  '$q',
  function ($q) {
    return {
      card: {
        createToken: internals.promisify(Stripe.card, 'createToken', $q)
      },
      bankAccount: {
        createToken: internals.promisify(Stripe.bankAccount, 'createToken', $q)
      }
    };
  }
];