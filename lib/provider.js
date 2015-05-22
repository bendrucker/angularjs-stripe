'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

'use strict';

exports['default'] = stripeProvider;

stripeProvider.$inject = ['Stripe'];
function stripeProvider(Stripe) {
  if (!Stripe) throw new Error('Stripe must be available as window.Stripe');
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = _service2['default'];
}
module.exports = exports['default'];