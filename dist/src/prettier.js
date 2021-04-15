'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var mrm_core_1 = require('mrm-core')
var perttier_json_1 = __importDefault(require('../template/perttier.json'))
function default_1() {
  var packages = ['prettier']
  mrm_core_1.json('.prettierrc.json').merge(perttier_json_1.default).save()
  mrm_core_1.packageJson().setScript('prettier', 'prettier --write .').save()
  mrm_core_1.install(packages)
}
exports.default = default_1
