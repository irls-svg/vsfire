/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  // Jest shouldn't try to run /test/ folder tests
  testRegex: __dirname + '/src/.*\\.test\\.tsx?$'
};
