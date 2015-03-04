'use strict';

import service from './service';
export default stripeProvider;

stripeProvider.$inject = ['Stripe']
function stripeProvider (Stripe) {
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = service;
};
