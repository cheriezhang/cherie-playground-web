import { FlatCompat } from "@eslint/eslintrc"; // to compat with old eslintrc
import eslintPluginImport from 'eslint-plugin-import';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // import order
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
];

export default eslintConfig;
