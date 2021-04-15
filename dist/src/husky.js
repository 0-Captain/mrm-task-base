'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var mrm_core_1 = require('mrm-core')
var husky = __importStar(require('husky'))
var githooks_json_1 = __importDefault(require('../template/githooks.json'))
exports.default = function () {
  var packages = [
    'husky',
    'lint-staged',
    'git-cz',
    'commitlint',
    '@commitlint/config-conventional',
  ]
  var pkg = mrm_core_1.packageJson()
  pkg
    .unset('husky')
    .merge(githooks_json_1.default)
    .setScript('commit', 'git-cz')
    .appendScript('prepare', 'npx husky install') // 不支持yarn2
    .save()
  mrm_core_1.install(packages)
  husky.install()
  husky.set('.husky/pre-commit', 'npx lint-staged')
  husky.set('.husky/commit-msg', 'npx commitlint -e $HUSKY_GIT_PARAMS')
}
