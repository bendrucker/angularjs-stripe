'use strict'

var angular = require('angular')
var provider = require('./provider')
var Stripe = window.Stripe

module.exports = angular.module('angular-stripe', [
  require('angular-assert-q-constructor')
])
.constant('Stripe', Stripe)
.provider('stripe', provider)
.run(verifyQ)
.name

verifyQ.$inject = ['assertQConstructor']
function verifyQ (assertQConstructor) {
  assertQConstructor('angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor')
}
