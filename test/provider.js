'use strict';

import angular from 'angular';
import 'angular-mocks';
import Stripe from 'stripe';
import angularStripe from '../';
import {expect} from 'chai';

describe('Provider', function () {

  beforeEach(angular.mock.module(angularStripe));

  it('exposes Stripe#setPublishableKey', function () {
    angular.mock.module(function (stripeProvider) {
      expect(stripeProvider.setPublishableKey).to.equal(Stripe.setPublishableKey);
    });
    angular.mock.inject();
  });

});
