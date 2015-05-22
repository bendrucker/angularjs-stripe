'use strict'

import angular from 'angular'
import assertQCtor from 'angular-assert-q-constructor'
import provider from './provider'
const Stripe = typeof window !== 'undefined' ? window.Stripe : typeof global !== 'undefined' ? global.Stripe : null

export default angular.module('angular-stripe', [
  assertQCtor
])
.constant('Stripe', Stripe)
.provider('stripe', provider)
.run(verifyQ)
.name

verifyQ.$inject = ['assertQConstructor']
function verifyQ (assertQConstructor) {
  assertQConstructor('angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor')
}
