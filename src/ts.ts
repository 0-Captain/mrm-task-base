import { json, install } from 'mrm-core'

import tsconfigDefault from '../template/tsconfig.json'

export default function () {
  const packages = ['typescript']

  json('tsconfig.json').merge(tsconfigDefault).save()

  install(packages)
}
