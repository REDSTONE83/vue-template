module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  watchPathIgnorePatterns: ['node_modules'],
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
};
