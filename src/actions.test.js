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
        { name: 'claim', description: 'Claim your panini tokens!' },
        { name: 'ping', description: 'Responds with Pong!' },
      ]
      assert.strictEqual(actions.getCommands(), expectedActions)
    })
  })
})
