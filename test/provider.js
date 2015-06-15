'use strict'

/* global describe, it */

var angular = require('angular')
require('angular-mocks/ngMock')
var expect = require('chai').expect
var Stripe = window.Stripe
var angularStripe = require('../')

describe('Provider', function () {
  it('exposes Stripe#setPublishableKey', function (done) {
    angular.mock.module(angularStripe, function (stripeProvider) {
      expect(stripeProvider.setPublishableKey).to.equal(Stripe.setPublishableKey)
      done()
    })
    angular.mock.inject()
  })
})
