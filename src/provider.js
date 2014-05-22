'use strict';

var Stripe = require('stripe');

module.exports = function () {
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = require('./service');
};