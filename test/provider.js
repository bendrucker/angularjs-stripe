'use strict'

/* global describe, it */

import angular from 'angular'
import 'angular-mocks'
import Stripe from 'stripe'
import angularStripe from '../'
import {expect} from 'chai'

describe('Provider', () => {
  it('exposes Stripe#setPublishableKey', (done) => {
    angular.mock.module(angularStripe, (stripeProvider) => {
      expect(stripeProvider.setPublishableKey).to.equal(Stripe.setPublishableKey)
      done()
    })
    angular.mock.inject()
  })
})
