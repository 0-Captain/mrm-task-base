'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.description = void 0
var enquirer_1 = require('enquirer')
var prettier_1 = __importDefault(require('./src/prettier'))
var ts_1 = __importDefault(require('./src/ts'))
var husky_1 = __importDefault(require('./src/husky'))
var eslint_1 = __importDefault(require('./src/eslint'))
function task() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, requireStack, framework, typescript
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            enquirer_1.prompt([
              {
                type: 'multiselect',
                name: 'requireStack',
                message: "select what's your need",
                hint:
                  '(Press <space> to select, <a> to toggle all, <i> to invert selection)',
                choices: [
                  { message: 'prettier', name: 'prettier' },
                  { message: 'eslint', name: 'eslint' },
                  { message: 'husky', name: 'husky' },
                ],
              },
              {
                type: 'select',
                name: 'framework',
                message: 'Which framework does your project use?',
                initial: 1,
                choices: [
                  { message: 'None of these', name: 'none' },
                  { message: 'React', name: 'react' },
                  { message: 'Vue.js', name: 'vue' },
                ],
                skip: function () {
                  return !this.state.answers.requireStack.includes('eslint')
                },
              },
              {
                type: 'toggle',
                name: 'typescript',
                message: 'Does your project use TypeScript?',
                // enabled: 'Yes',
                // disabled: 'No',
                skip: function () {
                  return !this.state.answers.requireStack.includes('eslint')
                },
              },
            ]),
          ]
        case 1:
          ;(_a = _b.sent()),
            (requireStack = _a.requireStack),
            (framework = _a.framework),
            (typescript = _a.typescript)
          if (requireStack.includes('prettier')) {
            prettier_1.default()
          }
          if (requireStack.includes('husky')) {
            husky_1.default()
          }
          if (typescript) {
            ts_1.default()
          }
          if (requireStack.includes('eslint')) {
            eslint_1.default({
              ts: typescript,
              prettier: requireStack.includes('prettier'),
              framework: framework,
            })
          }
          return [2 /*return*/]
      }
    })
  })
}
exports.default = task
exports.description = 'initial code configration'
