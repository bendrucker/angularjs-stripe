'use strict'

var stripeAsPromised = require('stripe-as-promised')

module.exports = factory

factory.$inject = ['Stripe', '$q']
function factory (Stripe, $q) {
  return stripeAsPromised(Stripe, $q)
}
