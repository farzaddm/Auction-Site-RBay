module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  testMatch: ["**/tests/**/*.test.ts"], // Ensure this matches your test file paths
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },

  // ...existing code...
};
