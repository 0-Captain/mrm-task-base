import { json, packageJson, install } from 'mrm-core'

import perttierDefault from '../template/perttier.json'

export default function () {
  const packages = ['prettier']
  json('.prettierrc.json').merge(perttierDefault).save()

  packageJson().setScript('prettier', 'prettier --write .').save()

  install(packages)
}
