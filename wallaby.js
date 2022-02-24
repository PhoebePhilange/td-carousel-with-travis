module.exports = function(wallaby) {
  return {
    testFramework: 'jest',

    env: {
      type: 'node',
    },

    tests: ['src/tests/**/*.test.js'],
    files: ['src/**/*.js', '!**/*.test.js', '!**/.*'],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
