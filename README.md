angular-stripe [![Build Status](https://travis-ci.org/bendrucker/angular-stripe.svg?branch=master)](https://travis-ci.org/bendrucker/angular-stripe)
==============

Angular provider for easy interaction with [Stripe.js](https://stripe.com/docs/stripe.js). angular-stripe wraps Stripe.js's async operations in `$q` promises, making response handling easier and eliminating `$scope.$apply` calls and other repetitive boilerplate in your application. Check out [angular-credit-cards](https://github.com/bendrucker/angular-credit-cards) for validating your credit card forms. angular-stripe is powered by [stripe-as-promised](https://github.com/bendrucker/stripe-as-promised).

## Installing
```bash
$ npm install --save angular-stripe
```

## Usage

angular-stripe expects Stripe.js to be available as `window.Stripe` when it loads.

```js
// node module exports the string 'angular-stripe' for convenience
angular.module('myApp', [
  require('angular-stripe')
]);
// otherwise, include the code first then the module name
angular.module('myApp', [
  'angular-stripe'
]);
```

## API

### `stripeProvider`

angular-stripe exposes `stripeProvider` for configuring Stripe.js.

##### `stripeProvider.setPublishableKey(key)` -> `undefined`

Sets your Stripe [publishable key](https://stripe.com/docs/stripe.js#setting-publishable-key). 

```js
angular
  .module('myApp', [
    'angular-stripe'
  ])
  .config(function (stripeProvider) {
    stripeProvider.setPublishableKey('my_key');
  });
```

<hr>

### `stripe`

Inject `stripe` into your services or controllers to access the API methods. `createToken` returns a `$q` promise. If Stripe responds with an error, the promise will be rejected. 

---

##### `stripe.setPublishableKey(key)` -> `undefined`

Same as [`stripeProvider.setPublishableKey`](#stripeprovidersetpublishablekeykey---undefined)

---

### `stripe.card`

##### `stripe.card.createToken(card [, params])` -> `promise`
 
Tokenizes a card using [`Stripe.card.createToken`](https://stripe.com/docs/stripe.js#card-createToken). You can optionally pass a `key` property under `params` to use a different publishable key than the default to create that token. This is especially useful for applications using [Stripe Connect](https://stripe.com/connect).

The following utility methods are also exposed:

* [`validateCardNumber`](https://stripe.com/docs/stripe.js#card-validateCardNumber)
* [`validateExpiry`](https://stripe.com/docs/stripe.js#card-validateExpiry)
* [`validateCVC`](https://stripe.com/docs/stripe.js#card-validateCVC)
* [`cardType`](https://stripe.com/docs/stripe.js#card-cardType)

---

#### `stripe.bankAccount`
 
##### `stripe.bankAccount.createToken(bankAccount [, params])` -> `promise`

Tokenizes a card using [`Stripe.bankAccount.createToken`](https://stripe.com/docs/stripe.js#bank-account-createToken).

The following utility methods are also exposed:

* [`validateRoutingNumber`](https://stripe.com/docs/stripe.js#bank-account-validateRoutingNumber)
* [`validateAccountNumber`](https://stripe.com/docs/stripe.js#bank-account-validateAccountNumber)

---

#### `stripe.bitcoinReceiver`

##### `stripe.bitcoinReceiver.createReceiver` -> `promise`

Creates a bitcoin receiver using [`Stripe.bitcoinReceiver.createReceiver`](https://stripe.com/docs/stripe.js#bitcoinreceiver-createreceiver).

##### `stripe.bitcoinReceiver.pollReceiver` -> `promise`

Polls a bitcoin receiver using [`Stripe.bitcoinReceiver.pollReceiver`](https://stripe.com/docs/stripe.js#bitcoinreceiver-pollreceiver). Note that you'll need to implement [additional logic if you need to cancel receivers](https://github.com/bendrucker/stripe-as-promised#bitcoin).

The following utility methods are also exposed:

* [`cancelReceiverPoll`](https://stripe.com/docs/stripe.js#bitcoinreceiver-cancelreceiverpoll)

---

## Examples

#### Charging a card

```js
app.controller('PaymentController', function ($scope, $http, stripe) {
  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
        console.log('token created for card ending in ', response.card.last4);
        var payment = angular.copy($scope.payment);
        payment.card = void 0;
        payment.token = response.id;
        return $http.post('https://yourserver.com/payments', payment);
      })
      .then(function (payment) {
        console.log('successfully submitted payment for $', payment.amount);
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
        }
        else {
          console.log('Other error occurred, possibly with your API', err.message);
        }
      });
  };
});
```
