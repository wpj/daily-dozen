module.exports = {
  testRegex: '(/__tests__/.*\\.([tj]sx?)|(\\.|/)test)\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/internal/jest/loadershim.js`],
};
