'use strict'

/* global describe, it */

var angular = require('angular')
require('angular-mocks/ngMock')
var expect = require('chai').expect
var angularStripe = require('../')

describe('Provider', function () {
  it('exposes Stripe#setPublishableKey', function (done) {
    angular.mock.module(angularStripe, function (stripeProvider) {
      expect(typeof stripeProvider.setPublishableKey).to.equal('function')
      done()
    })
    angular.mock.inject()
  })

  it('exposes url', function (done) {
    angular.mock.module(angularStripe, function (stripeProvider) {
      expect(typeof stripeProvider.url).to.equal('string')
      done()
    })
    angular.mock.inject()
  })
})
