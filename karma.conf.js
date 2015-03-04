'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'mocha'],
    browserify: {
      debug: true,
      transform: ['babelify', 'browserify-istanbul', 'browserify-shim']
    },
    files: [
      'node_modules/angular/angular.js',
      'components/stripe/index.js',
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
