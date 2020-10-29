module.exports = {
  name: 'cloud-pci-frontend',
  verbose: true,
  testRegex: '((\\.|/*.)(test))\\.js?$',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/index.js',
    '!**/AppRoute.js',
    '!**/components/**',
    '!**/containers/**'
  ],
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
