'use strict'

import angular from 'angular'
import provider from './provider'
import Stripe from 'stripe'

export default angular.module('angular-stripe', [])
  .constant('Stripe', Stripe)
  .provider('stripe', provider)
  .name
