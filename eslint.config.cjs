const js = require("@eslint/js");
const globals = require("globals");
const pluginReact = require("eslint-plugin-react");
const pluginReactHooks = require("eslint-plugin-react-hooks");
const prettierRecommended = require("eslint-plugin-prettier/recommended");
const jsonPlugin = require("eslint-plugin-json");
const { defineConfig } = require("eslint/config");

const tsEslintParser = require('@typescript-eslint/parser');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const pluginReactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        __DEV__: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      json: jsonPlugin,
      prettier: prettierRecommended.plugins.prettier,
      "react-native": pluginReactNative,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs.stylistic.rules,
      ...pluginReact.configs.recommended.rules,
      ...prettierRecommended.rules,

      'react/prop-types': 'off',

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'error',
      'react-native/no-single-element-style-arrays': 'warn',
      'no-undef': 'error',

      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "prettier/prettier": "error",
      'react/no-unescaped-entities': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
  },
  {
    files: ["src/**/*.json"],
    plugins: {
      json: jsonPlugin,
    },
    rules: {
      ...jsonPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["src/**/*.md"],
  },
  {
    ignores: [
      "node_modules/",
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
      "**/ios/**",
      "**/android/**",
      "coverage/",
      "dist/",
    ],
  },
]);
