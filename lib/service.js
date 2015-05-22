'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stripeAsPromised = require('stripe-as-promised');

var _stripeAsPromised2 = _interopRequireDefault(_stripeAsPromised);

'use strict';

exports['default'] = factory;

factory.$inject = ['Stripe', '$q'];
function factory(Stripe, $q) {
  return _stripeAsPromised2['default'](Stripe, $q);
}
module.exports = exports['default'];