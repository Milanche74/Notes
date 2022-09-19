module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:wc/recommended", "plugin:lit/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // rules: {
  //   "padding-line-between-statements": [
  //     "error",
  //     { blankLine: "always", prev: "*", next: "*" },
  //   ],
  // },
};
