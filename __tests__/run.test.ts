import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  const delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  console.log(process.env)
  const np = process.execPath
  console.log(np)
  const ip = path.join(__dirname, '..', 'src', 'run.js')
  console.log(ip)
  const options: cp.ExecFileSyncOptions = {
    env: {...process.env, GITHUB_EVENT_PATH: './mockEvent.json'}
  }
  cp.execFileSync(np, [ip], options).toString()
})
