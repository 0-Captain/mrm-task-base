import { packageJson, install } from 'mrm-core'
import * as husky from 'husky'

import githooksDefault from '../template/githooks.json'

export default () => {
  const packages = [
    'husky', // 6.x
    'lint-staged',
    'git-cz',
    'commitlint',
    '@commitlint/config-conventional',
  ]

  const pkg = packageJson()

  pkg
    .unset('husky')
    .merge(githooksDefault)
    .setScript('commit', 'git-cz')
    .appendScript('prepare', 'npx husky install') // 不支持yarn2
    .save()

  install(packages)

  husky.install()
  husky.set('.husky/pre-commit', 'npx lint-staged')
  husky.set('.husky/commit-msg', 'npx commitlint -e $HUSKY_GIT_PARAMS')
}
