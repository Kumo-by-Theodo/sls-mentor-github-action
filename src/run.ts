import {exec} from '@actions/exec'
import {request} from './request'
import fs from 'fs'

const {GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN} = process.env
const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH ?? '', 'utf8'))

//console.log('GITHUB_EVENT_PATH', GITHUB_EVENT_PATH)

let {after: sha} = event
if (!sha) {
  sha = GITHUB_SHA
}
const {repository} = event
const {owner, name} = repository

const checkName = 'Sls-mentor check'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'User-Agent': 'sls-mentor-action'
}

async function createCheck(): Promise<string> {
  const body = {
    name: checkName,
    head_sha: sha,
    status: 'in_progress',
    started_at: new Date()
  }

  const {data} = await request(
    `https://api.github.com/repos/${owner}/${name}/check-runs`,
    {
      method: 'POST',
      headers,
      body
    }
  )
  const {id} = data
  return id
}
export async function slsMentor(): Promise<void> {
  const exitCode = await exec('npm run sls-mentor')
  console.log('exit code of action run', exitCode)
}

async function run(): Promise<void> {
  createCheck()
  try {
    slsMentor()
  } catch (err) {
    //console.log(err)
    process.exit(1)
  }
}

run()
