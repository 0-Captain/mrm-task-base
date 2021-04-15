/* eslint-disable @typescript-eslint/no-var-requires */
const task = require('./dist/index.js')

module.exports = task.default
Object.assign(exports, task)
