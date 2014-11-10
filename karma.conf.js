'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'mocha', 'chai-sinon'],
    browserify: {
      debug: true,
      transform: ['browserify-istanbul', 'browserify-shim']
    },
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'components/stripe/index.js',
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/chai-as-promised/lib/chai-as-promised.js',
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
  });
};
