import * as core from '@actions/core'
import {exec} from '@actions/exec'

async function run(): Promise<void> {
  try {
    await exec('npx', [
      'guardian',
      '-p',
      'safetracker-preprod',
      '-r',
      'eu-west-1',
      '-c',
      'safetracker-backend-operations-api-preprod'
    ])
    core.setOutput('hello', 12)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
