import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 1. Le decimos qué carpetas ignorar
  {
    ignores: ['node_modules', 'dist', 'build'],
  },

  // 2. Aplicamos la configuración que unifica ESLint con Prettier
  eslintPluginPrettierRecommended,

  // 3. Configuración para el frontend (React + JSX + API del navegador)
  {
    files: ['client/src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // 4. Configuración para el backend (Node.js, ESM)
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
