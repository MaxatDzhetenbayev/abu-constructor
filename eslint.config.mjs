import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src**/*.{js,mjs,cjs,ts, tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort, // Корректное подключение плагина
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "simple-import-sort/imports": [
        // Корректное имя правила
        "error",
        {
          groups: [
            // Внешние библиотеки
            ["^\\w"],
            // Абсолютные импорты
            ["^@/"],
            // Относительные импорты
            ["^\\./"],
          ],
        },
      ],
    },
  },
];
