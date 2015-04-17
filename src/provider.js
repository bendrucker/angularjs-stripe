'use strict'

import service from './service'
export default stripeProvider

stripeProvider.$inject = ['Stripe']
function stripeProvider (Stripe) {
  if (!Stripe) throw new Error('Stripe must be available as window.Stripe')
  this.setPublishableKey = Stripe.setPublishableKey
  this.$get = service
}
