module.exports = function(wallaby) {
    return {
      files: [
        { pattern: 'jest.config.js', instrument: false },
        { pattern: 'src/**/*.ts' },
        { pattern: 'src/**/*.json' },
        { pattern: 'src/**/*.spec.ts', ignore: true },
      ],
      tests: [{ pattern: 'src/**/*.spec.ts' }],
      compilers: {
        '**/*.ts': wallaby.compilers.typeScript()
      },
      env: {
        type: 'node',
        runner: 'node'
      },
      testFramework: 'jest',
      setup: function(wallaby) {
        const jestConfig = require('./jest.config');
  
        wallaby.testFramework.configure(jestConfig);
      }
    };
  };
  