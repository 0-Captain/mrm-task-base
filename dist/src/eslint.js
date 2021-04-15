'use strict'
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i]
    return to
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var mrm_core_1 = require('mrm-core')
var eslint_json_1 = __importDefault(require('../template/eslint.json'))
var frameworkDefaultRules = {
  react: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  vue: {},
}
function default_1(_a) {
  var ts = _a.ts,
    prettier = _a.prettier,
    framework = _a.framework
  var allPackages = {
    basic: ['eslint'],
    react: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
    vue: ['eslint-plugin-vue'],
    ts: ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'],
    prettier: ['eslint-config-prettier', 'eslint-plugin-prettier'],
  }
  var packages = __spreadArray([], allPackages.basic)
  // Create or load .eslintignore, and set basic ignores
  mrm_core_1.lines('.eslintignore').add(['node_modules/']).save()
  // .eslintrc
  var eslint = mrm_core_1.json('.eslintrc.json').merge(eslint_json_1.default)
  var eslintExtends = eslint.get('extends', [])
  var eslintPlugins = eslint.get('plugins', [])
  var eslintRules = eslint.get('rules', {})
  if (ts) {
    eslintExtends.push('plugin:@typescript-eslint/recommended')
    eslintPlugins.push('@typescript-eslint')
    eslint.set('parser', '@typescript-eslint/parser')
    packages.push.apply(packages, allPackages.ts)
  } else {
    eslintExtends.push('eslint:recommended')
  }
  if (prettier) {
    eslintExtends.push('plugin:prettier/recommended')
    packages.push.apply(packages, allPackages.prettier)
  }
  if (framework !== 'none') {
    Object.assign(eslintRules, frameworkDefaultRules[framework])
    if (framework == 'react') {
      eslintExtends.push('plugin:react/recommended')
      eslintPlugins.push('react', 'react-hooks')
      packages.push.apply(packages, allPackages.react)
    } else if (framework === 'vue') {
      eslintExtends.push('plugin:vue/essential')
      eslintPlugins.push('vue')
      packages.push.apply(packages, allPackages.vue)
    }
  }
  eslint
    .set('extends', Array.from(new Set(eslintExtends)))
    .set('plugins', Array.from(new Set(eslintPlugins)))
    .set('rules', eslintRules)
    .save()
  // Create or load package.json
  var pkg = mrm_core_1.packageJson()
  pkg
    .setScript('lint', 'eslint --cache --fix --ext .js,.jsx,.ts,.tsx src')
    .save()
  mrm_core_1.install(packages)
}
exports.default = default_1
