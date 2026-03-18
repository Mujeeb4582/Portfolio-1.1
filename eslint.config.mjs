import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Next.js core web vitals + TypeScript rules (flat config arrays)
  ...nextCoreWebVitals,
  ...nextTypescript,

  // Tailwind flat config
  ...tailwindPlugin.configs['flat/recommended'],

  // Project-wide rules
  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Prettier compatibility — disable formatting rules
      ...prettierConfig.rules,

      semi: 'off',
      'tailwindcss/no-custom-classname': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      // setMounted in useEffect is a valid SSR hydration safety pattern
      'react-hooks/set-state-in-effect': 'warn',
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: './tailwind.config.ts',
      },
      next: {
        rootDir: ['./app/'],
      },
    },
  },

  // Ignore patterns
  {
    ignores: ['node_modules/**', '.next/**', 'assets/**', 'public/**'],
  },
]

export default config
