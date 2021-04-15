import { json, packageJson, lines, install } from 'mrm-core'

import eslintDefault from '../template/eslint.json'

const frameworkDefaultRules = {
  react: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  vue: {},
}

interface EslintProps {
  ts: boolean
  prettier: boolean
  framework: 'react' | 'vue' | 'none'
}

export default function ({ ts, prettier, framework }: EslintProps) {
  const allPackages = {
    basic: ['eslint'],
    react: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
    vue: ['eslint-plugin-vue'],
    ts: ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'],
    prettier: ['eslint-config-prettier', 'eslint-plugin-prettier'],
  }
  const packages = [...allPackages.basic]

  // Create or load .eslintignore, and set basic ignores
  lines('.eslintignore').add(['node_modules/']).save()

  // .eslintrc
  const eslint = json('.eslintrc.json').merge(eslintDefault)

  const eslintExtends = eslint.get('extends', [])
  const eslintPlugins = eslint.get('plugins', [])
  const eslintRules = eslint.get('rules', {})

  if (ts) {
    eslintExtends.push('plugin:@typescript-eslint/recommended')
    eslintPlugins.push('@typescript-eslint')
    eslint.set('parser', '@typescript-eslint/parser')

    packages.push(...allPackages.ts)
  } else {
    eslintExtends.push('eslint:recommended')
  }

  if (prettier) {
    eslintExtends.push('plugin:prettier/recommended')

    packages.push(...allPackages.prettier)
  }

  if (framework !== 'none') {
    Object.assign(eslintRules, frameworkDefaultRules[framework])

    if (framework == 'react') {
      eslintExtends.push('plugin:react/recommended')
      eslintPlugins.push('react', 'react-hooks')
      packages.push(...allPackages.react)
    } else if (framework === 'vue') {
      eslintExtends.push('plugin:vue/essential')
      eslintPlugins.push('vue')
      packages.push(...allPackages.vue)
    }
  }

  eslint
    .set('extends', Array.from(new Set(eslintExtends)))
    .set('plugins', Array.from(new Set(eslintPlugins)))
    .set('rules', eslintRules)
    .save()
  // Create or load package.json
  const pkg = packageJson()

  pkg
    .setScript('lint', 'eslint --cache --fix --ext .js,.jsx,.ts,.tsx src')
    .save()

  install(packages)
}
