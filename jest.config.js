/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node", // bruk "jsdom" hvis du tester React-komponenter
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
