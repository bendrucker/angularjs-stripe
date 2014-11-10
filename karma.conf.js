// Karma configuration
// Generated on Tue May 20 2014 23:34:58 GMT-0400 (EDT)

module.exports = function (config) {
  config.set({

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['browserify', 'mocha', 'chai-sinon'],


  // list of files / patterns to load in the browser
  browserify: {
    debug: true,
    transform: ['browserify-istanbul', 'browserify-shim']
  },


  // list of files to exclude
  exclude: [
    
  ],

  files: [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'components/stripe/index.js',
    'node_modules/es5-shim/es5-shim.js',
    'node_modules/chai-as-promised/lib/chai-as-promised.js',
    'test/*.js'
  ],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/*.js': 'browserify'
  },


  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress', 'coverage'],

  coverageReporter: {
    type: 'lcovonly',
    dir: 'coverage',
    subdir: '.'
  },


  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['PhantomJS'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false
  });
};
