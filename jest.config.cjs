const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig");

module.exports = {
  roots: ["<rootDir>/src"],
  setupFiles: ['./test/utils/setupJestMock.js'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.(css)$": "<rootDir>/assets/css/__mocks__/styleMock.js"
  },
};
