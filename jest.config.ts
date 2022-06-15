// import type { Config } from "@jest/types";

const config = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  setupFilesAfterEnv: ["regenerator-runtime/runtime"],
  moduleFileExtensions: ["js", "json", "ts", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};

export default config;
