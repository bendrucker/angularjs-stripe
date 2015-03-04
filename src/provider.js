'use strict';

import Stripe from 'stripe';
import service from './service';

export default function stripeProvider () {
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = service;
};
