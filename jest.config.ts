import type {Config} from '@jest/types';

module.exports = {
  roots: ["src"],
  // clearMocks: true,
  setupFilesAfterEnv: ["regenerator-runtime/runtime"],
  testPathIgnorePatterns: ["/node_modules/"],
};
