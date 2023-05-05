/**
 * @jest-environment ./__tests__/mockEnv.ts
 */
import {slsMentor} from '../src/run'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

const handlers = [
  rest.post(
    `https://api.github.com/repos/tototo/totot/check-runs`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200, 'OK'),
        ctx.json({
          id: '10000'
        })
      )
    }
  )
]
export const server = setupServer(...handlers)

// shows how the runner will run a javascript action with env / stdout protocol
describe('sls mentor github action', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })
  it('should run sls-mentor', async () => {
    await slsMentor()
  })
})
