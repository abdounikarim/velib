import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist/**', 'src/locales/**'] },

  js.configs.recommended,

  // Legacy browser scripts — loaded as classic <script> tags, use var and app-level globals
  {
    files: ['js/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      ecmaVersion: 2015,
      globals: {
        ...globals.browser,
        google: 'readonly',
        markerClusterer: 'readonly',
        M: 'readonly',
        $: 'readonly',
        VelibMap: 'writable',
        VelibMarker: 'writable',
        VelibMarkerCluster: 'writable',
        VelibOpenData: 'writable',
        VelibReservation: 'writable',
        VelibCanvas: 'writable',
        VelibInfo: 'writable',
      },
    },
    rules: {
      'no-var': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // TypeScript source modules
  {
    files: ['src/**/*.ts'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Plain ESM source files (adapters, i18n, config)
  {
    files: ['src/**/*.js', 'scripts/**/*.mjs', '*.config.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Cypress E2E tests
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Global rule overrides
  {
    rules: {
      'no-console': 'off',
    },
  },

  // Disable ESLint formatting rules that conflict with Prettier (must be last)
  prettierConfig,
]
