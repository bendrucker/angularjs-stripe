'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularAssertQConstructor = require('angular-assert-q-constructor');

var _angularAssertQConstructor2 = _interopRequireDefault(_angularAssertQConstructor);

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

'use strict';

var Stripe = typeof window !== 'undefined' ? window.Stripe : typeof global !== 'undefined' ? global.Stripe : null;

exports['default'] = _angular2['default'].module('angular-stripe', [_angularAssertQConstructor2['default']]).constant('Stripe', Stripe).provider('stripe', _provider2['default']).run(verifyQ).name;

verifyQ.$inject = ['assertQConstructor'];
function verifyQ(assertQConstructor) {
  assertQConstructor('angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor');
}
module.exports = exports['default'];