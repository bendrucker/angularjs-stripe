'use strict'

var service = require('./service')

module.exports = stripeProvider

stripeProvider.$inject = ['$window']
function stripeProvider ($window) {
  var Stripe = $window.Stripe;
  if (!Stripe) throw new Error('Stripe must be available as window.Stripe')
  this.setPublishableKey = Stripe.setPublishableKey
  this.$get = service
}
