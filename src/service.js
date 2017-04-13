'use strict'

var stripeAsPromised = require('stripe-as-promised')

module.exports = factory

factory.$inject = ['$window', '$q']
function factory ($window, $q) {
  return stripeAsPromised($window.Stripe, $q)
}
