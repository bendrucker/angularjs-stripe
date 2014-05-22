'use strict';

var angular = require('angular');
var Stripe  = require('stripe');

require('../src');

describe('Service', function () {

  this.timeout(500);

  beforeEach(angular.mock.module('angular-stripe'));

  ['card', 'bankAccount'].forEach(function (resource) {

    describe(resource + '#createToken', function () {

      var spy;
      beforeEach(function () {
        spy = Stripe[resource].createToken = sinon.spy();
      });

      var stripe, $timeout;
      beforeEach(angular.mock.inject(function (_stripe_, _$timeout_) {
        stripe = _stripe_;
        $timeout = _$timeout_;
      }));

      var method, data, response;
      beforeEach(function () {
        method = stripe[resource].createToken;
        data = {};
        response = {};
      });

      it('calls the Stripe.js method with the data', function () {
        method(data);
        expect(spy).to.have.been.calledWith(data);
      });

      it('resolves on success', function () {
        Stripe[resource].createToken = sinon.spy(function (data, callback) {
          $timeout(angular.bind(null, callback, 200, response));
        });
        method(data).then(function (res) {
          expect(res).to.equal(response);
        });
        $timeout.flush();
      });

      it('rejects on error', function () {
        response.error = {};
        Stripe[resource].createToken = sinon.spy(function (data, callback) {
          $timeout(angular.bind(null, callback, 400, response));
        });
        method(data).catch(function (err) {
          expect(err).to.equal(response.error);
        });
        $timeout.flush();
      });

    });

  });

});