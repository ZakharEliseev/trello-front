import cssModules from "eslint-plugin-css-modules";
import eslintPluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist", "css"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      import: eslintPluginImport,
      prettier,
      "css-modules": cssModules,
    },
    rules: {
      // CSS Modules
      "css-modules/no-undef-class": ["error", { camelCase: true }],

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      //React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/set-state-in-render": "error",

      //React Compiler extras
      "react-hooks/config": "warn",
      "react-hooks/gating": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/unsupported-syntax": "warn",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Import rules
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",

      // React rules
      "react/display-name": "off",
      "react/self-closing-comp": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",

      // Other rules
      "arrow-body-style": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      "no-param-reassign": [
        "error",
        { props: true, ignorePropertyModificationsFor: ["ws", "state"] },
      ],
      "no-console": [1, { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern:
                "{antd,antd/**,antd-*,axios,validator,clsx,i18next,i18next-*,ramda,yup,react-*,valtio,valtio-*}",
              group: "external",
              position: "after",
            },
            {
              pattern: "{@/**,@**,@**/**}",
              group: "internal",
              position: "after",
            },
            {
              pattern: "{.,..}/**/*.scss",
              group: "sibling",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["dayjs"],
              message:
                "Импорт dayjs запрещен. Используйте DateService для работы с датами.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='getItem'][arguments.0.value='accessToken']",
          message:
            "Прямое обращение к accessToken через localStorage запрещено. Используйте tokenService.getAccessToken() или userStore.tokens?.access",
        },
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='getItem'][arguments.0.value='refreshToken']",
          message:
            "Прямое обращение к refreshToken через localStorage запрещено. Используйте tokenService.getRefreshToken() или userStore.tokens?.refresh",
        },
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='setItem'][arguments.0.value='accessToken']",
          message:
            "Прямое сохранение accessToken в localStorage запрещено. Используйте tokenService.setTokens()",
        },
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='setItem'][arguments.0.value='refreshToken']",
          message:
            "Прямое сохранение refreshToken в localStorage запрещено. Используйте tokenService.setTokens()",
        },
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='removeItem'][arguments.0.value='accessToken']",
          message:
            "Прямое удаление accessToken из localStorage запрещено. Используйте tokenService.clearTokens()",
        },
        {
          selector:
            "CallExpression[callee.object.name='localStorage'][callee.property.name='removeItem'][arguments.0.value='refreshToken']",
          message:
            "Прямое удаление refreshToken из localStorage запрещено. Используйте tokenService.clearTokens()",
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
  {
    files: ["**/services/TokenService.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
];
