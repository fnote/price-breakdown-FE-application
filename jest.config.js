module.exports = {
  name: 'cloud-pci-frontend',
  verbose: true,
  collectCoverageFrom: [
    'src/containers/PriceValidation/PricingHelper.js',
    'src/utils/**'
  ],
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
