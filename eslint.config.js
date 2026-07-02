import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'

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
    },
  },

  // Modern ESM source files
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
  },

  // Global rule overrides
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // Disable ESLint formatting rules that conflict with Prettier (must be last)
  prettierConfig,
]
