'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var mrm_core_1 = require('mrm-core')
var tsconfig_json_1 = __importDefault(require('../template/tsconfig.json'))
function default_1() {
  var packages = ['typescript']
  mrm_core_1.json('tsconfig.json').merge(tsconfig_json_1.default).save()
  mrm_core_1.install(packages)
}
exports.default = default_1
