import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {RestHandler, rest} from 'msw'
import { setupServer } from 'msw/node'

const handlers = [rest.post(`https://api.github.com/repos/tototo/totot/check-runs`, (req, res, ctx) => {
  console.log(req)
  return res(
    ctx.status(200, 'OK'), 
    ctx.json({
      id: '10000',
    }),
  )
}),]
export const server = setupServer(...handlers)

// shows how the runner will run a javascript action with env / stdout protocol
describe('sls mentor github action', () => {
    it('should run sls-mentor', () => {
      const np = process.execPath
      const ip = path.join(__dirname, '..', 'src', 'run.js')
      const options: cp.ExecFileSyncOptions = {
        env: {
          ...process.env,
          GITHUB_EVENT_PATH: path.join(__dirname, 'mockEvent.json')
        }
      }
      cp.execFileSync(np, [ip], options).toString()
    })
})

