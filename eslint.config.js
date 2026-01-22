import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore common generated/build folders to avoid linting production bundles
  globalIgnores(['dist', 'build', 'my-react-app/build', 'public', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Allow context exports; project requires exporting context/provider from same file
      'react-refresh/only-export-components': 'off',
    },
  },
  // Enable jest globals for test files so test/expect don't trigger no-undef
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      // include browser globals and jest globals for test files
      globals: { ...globals.browser, ...globals.jest },
    },
  },
])
