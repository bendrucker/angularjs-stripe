'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

require('../src');

require('angular-mocks');

describe('Provider', function () {

  beforeEach(angular.mock.module('angular-stripe'));

  it('exposes Stripe#setPublishableKey', function () {
    angular.mock.module(function (stripeProvider) {
      expect(stripeProvider.setPublishableKey).to.equal(Stripe.setPublishableKey);
    });
    inject();
  });

});