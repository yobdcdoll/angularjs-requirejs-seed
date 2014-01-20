module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'app/js/*.js', included: false},
            {pattern: 'app/js/**/*.js', included: false},
            {pattern: 'test/unit.js', included: false},
            {pattern: 'test/unit/*.js', included: false},
            {pattern: 'test/unit/**/*.js', included: false},
            {pattern: 'libs/**/*.js', included: false},
            // needs to be last http://karma-runner.github.io/0.10/plus/requirejs.html
            'test/main-test.js'
        ],

        autoWatch: true,

        LogLevel: LOG_DEBUG,

        browsers: ['Chrome'],

        singleRun: true,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
