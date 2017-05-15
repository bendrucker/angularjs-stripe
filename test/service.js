'use strict'

/* global describe, it, beforeEach, afterEach */

var angular = require('angular')
require('angular-mocks/ngMock')
var sinon = require('sinon')
var expect = require('chai').use(require('sinon-chai')).use(require('chai-as-promised')).expect
var angularStripe = require('../')

var inject = angular.mock.inject

describe('stripe: Service', function () {
  window.mocha.options.globals = (window.mocha.options.globals || []).concat(['Stripe'])

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
    expect(typeof stripe.setPublishableKey).to.equal('function')
  }))

  it('can lazily set the publishable key', function () {
    var p
    inject(function (stripe) {
      p = stripe.setPublishableKey('boop')
        .then(function () {
          expect(typeof window.Stripe).to.equal('function')
          expect(window.Stripe.key).to.equal('boop')
        })
    })

    return p
  })

  describe('card', function () {
    describe('#createToken', function () {
      it('resolves on success', function () {
        var p
        inject(function (stripe) {
          sinon.stub(window.Stripe.card, 'createToken').yieldsAsync(200, response)

          p = stripe.card.createToken(data).then(function (res) {
            expect(res).to.equal(response)
          })
        })

        return p
      })

      it('rejects on error', function () {
        var p
        inject(function (stripe) {
          response.error = {
            code: 'invalid_expiry_year',
            message: 'Your card\'s expiration year is invalid.',
            param: 'exp_year',
            type: 'card_error'
          }

          window.Stripe.card.createToken.restore()
          sinon.stub(window.Stripe.card, 'createToken').yieldsAsync(400, response)

          p = expect(stripe.card.createToken(data)).to.be.rejected
            .then(function (err) {
              expect(err.message).to.contain(response.error.message)
            })
        })

        return p
      })
    })
  })
})
