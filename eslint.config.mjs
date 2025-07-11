import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import json from "eslint-plugin-json";
import { defineConfig } from "eslint/config";

module.exports = {
  root: true,
  extends: '@react-native',
};


export default defineConfig([
  {
    files: ["src/**/*.{js,ts,md,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      json: json,
    },
    extends: [
      ...js.configs.recommended.extends,
      ...pluginReact.configs.recommended.extends,
      ...prettierRecommended.extends,
    ],
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...prettierRecommended.rules,
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
    },
  },
  {
    files: ["src/**/*.json"],
    plugins: {
      json: json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },
]);
