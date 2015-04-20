'use strict'

/* global describe, it */

import angular from 'angular'
import 'angular-mocks'
import angularStripe from '../'
import {expect} from 'chai'

describe('when window.Stripe is not defined', () => {
  it('throws an immediate exception', () => {
    expect(() => {
      angular.mock.module(angularStripe)
      angular.mock.inject()
    })
    .to.throw('Stripe must be available as window.Stripe')
  })
})
