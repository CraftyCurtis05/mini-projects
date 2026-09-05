import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'assets/js/search-data.js'
    ]
  },

  {
    files: [
      'assets/js/**/*.js'
    ],

    languageOptions: {
      ecmaVersion:
        'latest',

      sourceType:
        'script',

      globals: {
        ...globals.browser,

        /*
         * These values and functions are shared
         * between my browser scripts.
         */

        rootElement:
          'readonly',

        bodyElement:
          'readonly',

        pages:
          'readonly',

        navGroups:
          'readonly',

        portfolioUrl:
          'readonly',

        searchIndex:
          'readonly',

        escapeHtml:
          'readonly',

        getFavorites:
          'readonly',

        saveFavorites:
          'readonly',

        currentPageLabel:
          'readonly',

        renderNavigation:
          'readonly',

        initializeGroupedNavigation:
          'readonly',

        initializeMobileNavigation:
          'readonly',

        renderBreadcrumbs:
          'readonly',

        renderFooter:
          'readonly',

        renderDialogs:
          'readonly',

        renderSavedResults:
          'readonly',

        initializeTheme:
          'readonly',

        renderAuthorNote:
          'readonly',

        renderRelatedReferences:
          'readonly',

        addFavoriteButtons:
          'readonly',

        renderReferenceSearch:
          'readonly',

        initializeReferenceSearch:
          'readonly',

        renderTableOfContents:
          'readonly',

        initializeActiveToc:
          'readonly',

        initializeCopyButtons:
          'readonly',

        initializeSiteLoader:
          'readonly',

        initializeNotFoundPage:
          'readonly',

        initializeScrollProgress:
          'readonly',

        initializeBackToTop:
          'readonly',

        initializeRevealAnimations:
          'readonly',

        initializePatternDemos:
          'readonly'
      }
    },

    rules: {
      ...js.configs.recommended.rules,

     /*
      * These browser scripts intentionally share
      * functions across files, so ESLint cannot
      * reliably determine every unused global.
      */
      'no-unused-vars':
        'off',

     /*
      * My shared browser globals are declared in
      * this configuration so no-undef can still
      * catch genuinely undefined names. Their
      * actual declarations remain in their
      * respective JavaScript files.
      */
      'no-redeclare': [
        'error',
        {
          builtinGlobals:
            false
        }
      ]
    }
  }
];