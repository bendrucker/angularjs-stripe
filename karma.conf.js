'use strict'

module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'mocha'],
    browserify: {
      debug: true
    },
    files: [
      'node_modules/angular/angular.js',
      require.resolve('stripe-debug'),
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': 'browserify'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcovonly',
      dir: 'coverage',
      subdir: '.'
    },
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
