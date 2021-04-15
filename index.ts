import { prompt } from 'enquirer'
import prettier from './src/prettier'
import ts from './src/ts'
import husky from './src/husky'
import eslint from './src/eslint'

interface PromptResult {
  requireStack: Array<string>
  framework: 'none' | 'react' | 'vue'
  typescript: boolean
}

export default async function task() {
  const { requireStack, framework, typescript } = await prompt<PromptResult>([
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
      skip() {
        return !(this as any).state.answers.requireStack.includes('eslint')
      },
    },
    {
      type: 'toggle',
      name: 'typescript',
      message: 'Does your project use TypeScript?',
      // enabled: 'Yes',
      // disabled: 'No',
      skip() {
        return !(this as any).state.answers.requireStack.includes('eslint')
      },
    },
  ])

  if (requireStack.includes('prettier')) {
    prettier()
  }
  if (requireStack.includes('husky')) {
    husky()
  }
  if (typescript) {
    ts()
  }

  if (requireStack.includes('eslint')) {
    eslint({
      ts: typescript,
      prettier: requireStack.includes('prettier'),
      framework,
    })
  }
}

export const description = 'initial code configration'
