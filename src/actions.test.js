import assert from 'assert'
import { Actions } from './actions'

describe('Actions', () => {
  /**
   * @type {Actions} actions
   */
  let actions

  beforeEach(() => {
    actions = new Actions()
  })
  describe('#getCommands', () => {
    it('Should contain 2 precise commands', () => {
      const expectedActions = [
        { name: 'ping', description: 'Responds with Pong!' },
        { name: 'claim', description: 'Claim your Paninerd Tokens!' },
      ]
      assert.deepStrictEqual(actions.getCommands(), expectedActions)
    })
  })
})
