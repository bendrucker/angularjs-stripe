'use strict'

import stripeAsPromised from 'stripe-as-promised'

export default factory

factory.$inject = ['Stripe', '$q']
function factory (Stripe, $q) {
  return stripeAsPromised(Stripe, $q)
}
