angular-stripe [![Build Status](https://travis-ci.org/bendrucker/angular-stripe.svg?branch=master)](https://travis-ci.org/bendrucker/angular-stripe) [![Code Climate](https://codeclimate.com/github/bendrucker/angular-stripe/badges/gpa.svg)](https://codeclimate.com/github/bendrucker/angular-stripe) [![Test Coverage](https://codeclimate.com/github/bendrucker/angular-stripe/badges/coverage.svg)](https://codeclimate.com/github/bendrucker/angular-stripe) [![NPM version](https://badge.fury.io/js/angular-stripe.svg)](http://badge.fury.io/js/angular-stripe)
==============

Angular provider for easy interaction with [Stripe.js](https://stripe.com/docs/stripe.js). angular-stripe wraps Stripe.js's async operations in `$q` promises, making response handling easier and eliminating `$scope.$apply` calls and other repetitive boilerplate in your application. 

## Setup

angular-stripe expects Stripe.js to be available as `window.Stripe`.

```js
angular.module('myApp', [
  'angular-stripe'
]);
```

## Configuration

angular-stripe exposes `stripeProvider` for configuring Stripe.js.

#### `stripeProvider.setPublishableKey(key)` -> `undefined`

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

## Usage

Inject `stripe` into your services or controllers to access the API methods. `createToken` returns a `$q` promise. If Stripe responds with an error, the promise will be rejected. 

#### `stripe.card.createToken(card)` -> `promise`

Tokenizes a card using [`Stripe.card.createToken`](https://stripe.com/docs/stripe.js#card-createToken).

#### `stripe.bankAccount.createToken(bankAccount)` -> `promise`

Tokenizes a card using [`Stripe.bankAccount.createToken`](https://stripe.com/docs/stripe.js#bank-account-createToken).

### Example

```js
app.controller('PaymentController', function ($scope, $http, stripe) {
  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
      .then(function (token) {
        console.log('token created for card ending in ', token.card.last4);
        var payment = angular.copy($scope.payment);
        payment.card = void 0;
        payment.token = token.id;
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

### Stripe.js Helpers

angular-stripe also directly exposes Stripe's helper methods for easy access:

* `card`
  * [`validateCardNumber`](https://stripe.com/docs/stripe.js#card-validateCardNumber)
  * [`validateExpiry`](https://stripe.com/docs/stripe.js#card-validateExpiry)
  * [`validateCVC`](https://stripe.com/docs/stripe.js#card-validateCVC)
  * [`cardType`](https://stripe.com/docs/stripe.js#card-cardType)
* `bankAccount`
  * [`validateRoutingNumber`](https://stripe.com/docs/stripe.js#bank-account-validateRoutingNumber)
  * [`validateAccountNumber`](https://stripe.com/docs/stripe.js#bank-account-validateAccountNumber)

