import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 1. Le decimos qué carpetas ignorar
  {
    ignores: ['node_modules', 'dist', 'build'],
  },

  // 2. Aplicamos la configuración que unifica ESLint con Prettier
  eslintPluginPrettierRecommended,
];
