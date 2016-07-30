'use strict'

var LazyStripe = require('./lazy')

module.exports = stripeProvider

function stripeProvider () {
  var key = null
  var stripe = null

  this.url = 'https://js.stripe.com/v2/'
  this.setPublishableKey = function setPublishableKey (_key) {
    key = _key
  }

  this.$get = service
  this.$get.$inject = ['$q', '$exceptionHandler']

  function service ($q, $exceptionHandler) {
    if (stripe) return stripe
    stripe = LazyStripe(this.url, $q)
    stripe.setPublishableKey(key)
    return stripe
  }
}
