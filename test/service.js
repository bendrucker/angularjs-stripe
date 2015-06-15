'use strict'

/* global describe, it, beforeEach, afterEach */

var angular = require('angular')
require('angular-mocks/ngMock')
var sinon = require('sinon')
var expect = require('chai').use(require('sinon-chai')).expect
var angularStripe = require('../')
var Stripe = window.Stripe

var inject = angular.mock.inject

describe('stripe: Service', function () {
  this.timeout(500)

  beforeEach(angular.mock.module(angularStripe))

  var data, response, sandbox
  beforeEach(function () {
    data = {}
    response = {}
    sandbox = sinon.sandbox.create()
  })
  afterEach(function () {
    sandbox.restore()
  })

  it('exposes #setPublishableKey', inject(function (stripe) {
    expect(stripe.setPublishableKey).to.equal(Stripe.setPublishableKey)
  }))

  describe('card', function () {
    it('exposes helper methods', inject(function (stripe) {
      expect(stripe.card.validateCardNumber).to.equal(Stripe.card.validateCardNumber)
      expect(stripe.card.validateExpiry).to.equal(Stripe.card.validateExpiry)
      expect(stripe.card.validateCVC).to.equal(Stripe.card.validateCVC)
      expect(stripe.card.cardType).to.equal(Stripe.card.cardType)
    }))

    describe('#createToken', function () {
      it('calls the Stripe.js method with the data', function () {
        sandbox.stub(Stripe.card, 'createToken')
        inject(function (stripe) {
          stripe.card.createToken(data)
        })
        expect(Stripe.card.createToken).to.have.been.calledWith(data)
      })

      it('can pass params', function () {
        var params = {}
        sandbox.stub(Stripe.card, 'createToken')
        inject(function (stripe) {
          stripe.card.createToken(data, params)
        })
        expect(Stripe.card.createToken).to.have.been.calledWith(data, params)
      })

      it('resolves on success', function (done) {
        inject(function ($timeout) {
          Stripe.card.createToken = sinon.spy(function (data, callback) {
            $timeout(angular.bind(null, callback, 200, response))
          })
        })
        inject(function (stripe, $timeout) {
          stripe.card.createToken(data).then(function (res) {
            expect(res).to.equal(response)
            done()
          })
          $timeout.flush()
        })
      })

      it('rejects on error', function () {
        response.error = {
          code: 'invalid_expiry_year',
          message: 'Your card\'s expiration year is invalid.',
          param: 'exp_year',
          type: 'card_error'
        }
        inject(function ($timeout) {
          Stripe.card.createToken = sinon.spy(function (data, callback) {
            $timeout(angular.bind(null, callback, 400, response))
          })
        })
        inject(function (stripe, $timeout) {
          var err
          stripe.card.createToken(data)
            .catch(function (_err_) {
              err = _err_
            })
          $timeout.flush()
          expect(err).to.contain(response.error)
        })
      })

    })

  })

})
