module.exports = {
    globalSetup: './tests/setup.cjs',
    testEnvironment: 'node',

    // ✅ ES Modules support
    globals: {
        'NODE_OPTIONS': '--experimental-vm-modules'
    },
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    testMatch: [
        '**/tests/**/*.test.js'
    ],

    // ✅ Enable coverage
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],

    // ✅ Optional: use HTML reporter (optional)
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'Test Coverage Report',
            outputPath: 'coverage/test-report.html',
        }],
    ],
};
