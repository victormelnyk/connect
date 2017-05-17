module.exports = config => {
  config.set({
    autoWatch: false,
    singleRun: true,
    frameworks: ['browserify', 'jasmine'],
    browsers: ['PhantomJS'],
    colors: true,
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/underscore/underscore.js',
      'src/*.js',
      'tests/*.spec.js'
    ],

    preprocessors: {
      'src/*.js': ['browserify'],
      'tests/*.spec.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ['es2015'],
          sourceMap: 'inline'
        }],
        ['browserify-istanbul', {
          instrumenterConfig: {
            embedSource: true
          }
        }]
      ]
    },

    plugins: [
      'karma-babel-preprocessor',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-remap-coverage'
    ],

    reporters: ['dots', 'coverage', 'remap-coverage'],

    coverageReporter: {
      includeAllSources: true,
      reporters: [{
        type: 'in-memory'
      }]
    },

    remapCoverageReporter: {
      'text-summary': null,
      html: 'coverage/'
    }
  });
};
