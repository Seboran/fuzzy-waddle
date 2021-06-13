import assert from 'assert'
import sinon from 'sinon'
import { Actions } from './actions'
import { CommandInteraction, Client } from 'discord.js'

const discordClient = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

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

  describe('#ping', () => {
    it('Should reply "Tupu!"', () => {
      const interaction = { reply: () => {} }
      const spy = sinon.spy(interaction, 'reply').withArgs('Tupu!')
      actions.ping(interaction)
      assert(spy.called, "Reply wasn't called")
      assert.deepStrictEqual(
        spy.getCall(0).args,
        ['Tupu!'],
        'Invalid arguments provided by method',
      )
    })
  })
})
