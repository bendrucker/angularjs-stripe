'use strict'

var Lazy = require('lazy-async')
var dot = require('dot-prop')
var loadScript = require('load-script-global')
var stripeErrback = require('stripe-errback')

module.exports = LazyStripe

function LazyStripe (url, $q) {
  var methods = stripeErrback.methods.async.concat(stripeErrback.methods.sync)
  var lazy = Lazy(methods, load)

  return methods.reduce(function (acc, method) {
    var fn = dot.get(lazy, method)
    dot.set(acc, method, $q.promisify(fn))
    return acc
  }, {})

  function load (callback) {
    loadScript({
      url: url,
      global: 'Stripe'
    }, onLoad)

    function onLoad (err, Stripe) {
      if (err) return callback(err)
      var stripe = stripeErrback(Stripe)
      stripe.setPublishableKey = Success(stripe.setPublishableKey, stripe)
      callback(null, stripe)
    }
  }
}

function Success (fn, context) {
  return function success () {
    var callback = Array.prototype.pop.call(arguments)
    fn.apply(context, arguments)
    callback()
  }
}
