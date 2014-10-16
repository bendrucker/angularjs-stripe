'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

require('../src');

describe('stripe: Service', function () {

  this.timeout(500);

  beforeEach(angular.mock.module('angular-stripe'));

  var data, response, successMock, errorMock;
  beforeEach(function () {
    data = {};
    response = {};
    successMock = sinon.spy(function (data, callback) {
      $timeout(angular.bind(null, callback, 200, response));
    });
    errorMock = sinon.spy(function (data, callback) {
      $timeout(angular.bind(null, callback, 400, response));
    });
  });

  var stripe, $timeout;
  beforeEach(angular.mock.inject(function (_stripe_, _$timeout_) {
    stripe = _stripe_;
    $timeout = _$timeout_;
  }));

  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('card', function () {

    it('exposes helper methods', function () {
      expect(stripe.card.validateCardNumber).to.equal(Stripe.card.validateCardNumber);
      expect(stripe.card.validateExpiry).to.equal(Stripe.card.validateExpiry);
      expect(stripe.card.validateCVC).to.equal(Stripe.card.validateCVC);
      expect(stripe.card.cardType).to.equal(Stripe.card.cardType);
    });

    describe('#createToken', function () {

      it('calls the Stripe.js method with the data', function () {
        sandbox.stub(Stripe.card, 'createToken');
        stripe.card.createToken(data);
        expect(Stripe.card.createToken).to.have.been.calledWith(data);
      });

      it('resolves on success', function () {
        Stripe.card.createToken = successMock;
        var promise = stripe.card.createToken(data);
        $timeout.flush();
        expect(promise).to.eventually.equal(response);
      });

      it('rejects on error', function () {
        response.error = {};
        Stripe.card.createToken = errorMock;
        var promise = stripe.card.createToken();
        $timeout.flush();
        expect(promise).to.be.rejectedWith(response.error);
      });

    });

  });

  describe('bankAccount', function () {

    it('exposes helper methods', function () {
      expect(stripe.bankAccount.validateRoutingNumber).to.equal(Stripe.bankAccount.validateRoutingNumber);
      expect(stripe.bankAccount.validateAccountNumber).to.equal(Stripe.bankAccount.validateAccountNumber);
    });

    describe('#createToken', function () {

      it('calls the Stripe.js method with the data', function () {
        sandbox.stub(Stripe.bankAccount, 'createToken');
        stripe.bankAccount.createToken(data);
        expect(Stripe.bankAccount.createToken).to.have.been.calledWith(data);
      });

      it('resolves on success', function () {
        Stripe.bankAccount.createToken = successMock;
        var promise = stripe.bankAccount.createToken(data);
        $timeout.flush();
        expect(promise).to.eventually.equal(response);
      });

      it('rejects on error', function () {
        response.error = {};
        Stripe.bankAccount.createToken = errorMock;
        var promise = stripe.bankAccount.createToken();
        $timeout.flush();
        expect(promise).to.be.rejectedWith(response.error);
      });

    });

  });

});
