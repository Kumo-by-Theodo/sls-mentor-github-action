import NodeEnvironment from 'jest-environment-node'
import type {EnvironmentContext} from '@jest/environment'
import type {Config, Context} from 'jest'
import {dirname} from 'path'

export class CustomEnvironment extends NodeEnvironment {
  GITHUB_EVENT_PATH: string
  constructor(config: Config, context: Context) {
    super(config, context)
    this.GITHUB_EVENT_PATH = `${dirname}/__tests__/mockEvent.json`
  }
}
