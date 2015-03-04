'use strict';

import angular from 'angular';
import provider from './provider';

export default angular.module('angular-stripe', [])
  .provider('stripe', provider)
  .name;
