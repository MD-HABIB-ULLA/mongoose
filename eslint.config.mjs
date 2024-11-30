import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } } ,
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "no-undefined": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },

  {
    ignores: [".node_modules/*", "dist/*"]
  }
  ,
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
