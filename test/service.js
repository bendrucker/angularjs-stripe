'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

describe('stripe: Service', function () {

  this.timeout(500);

  beforeEach(angular.mock.module(require('../')));

  var data, response, successMock, errorMock;
  beforeEach(function () {
    data = {};
    response = {};
    successMock = sinon.spy(function (data, params, callback) {
      $timeout(angular.bind(null, callback, 200, response));
    });
    errorMock = sinon.spy(function (data, params, callback) {
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

  it('exposes #setPublishableKey', function () {
    expect(stripe.setPublishableKey).to.equal(Stripe.setPublishableKey);
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

      it('can pass params', function () {
        var params = {};
        sandbox.stub(Stripe.card, 'createToken');
        stripe.card.createToken(data, params);
        expect(Stripe.card.createToken).to.have.been.calledWith(data, params);
      });

      it('throw if params is a callback', function () {
        sandbox.stub(Stripe.card, 'createToken');
        expect(function () {
          stripe.card.createToken(data, function () {});
        })
        .to.throw('cannot be a function');
        expect(Stripe.card.createToken).to.not.have.been.called;
      });

      it('resolves on success', function () {
        Stripe.card.createToken = successMock;
        expect(stripe.card.createToken(data))
          .to.eventually.equal(response);
        $timeout.flush();
      });

      it('rejects on error', function () {
        response.error = {
          code: 'invalid_expiry_year',
          message: 'Your card\'s expiration year is invalid.',
          param: 'exp_year',
          type: 'card_error'
        };
        Stripe.card.createToken = errorMock;
        expect(stripe.card.createToken())
          .to.be.rejected
          .then(function (err) {
            expect(err).to.contain(response.error)
          });
        $timeout.flush();
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
        expect(stripe.bankAccount.createToken(data))
          .to.eventually.equal(response);
        $timeout.flush();
      });

      it('rejects on error', function () {
        response.error = {
          message: 'Routing number must have 9 digits',
          param: 'bank_account',
          type: 'invalid_request_error'
        };
        Stripe.bankAccount.createToken = errorMock;
        expect(stripe.bankAccount.createToken())
          .to.be.rejected
          .then(function (err) {
            expect(err).to.contain(response.error)
          });
        $timeout.flush();
      });

    });

  });

});
