import { Command, commands } from './decorators/command'

export class Actions {
  commands = []
  interactions = {}

  constructor() {
    this.commands = Object.keys(commands).map((key) => ({
      name: key,
      description: commands[key].description,
      handler: this[commands[key].key],
    }))
    this.commands.forEach(({ name, handler }) => (this.interactions[name] = handler))
  }

  getCommands() {
    return this.commands.map(({ handler, ...rest }) => ({ ...rest }))
  }

  async onMessage(message) {}

  async onInteraction(interaction) {
    const handler = this.interactions[interaction.commandName];

    if (!handler) {
      throw "Unknown interaction";
    }

    handler(interaction);
  }

  @Command({ name: 'ping', description: 'Responds with Pong!' })
  async ping(interaction) {
    await interaction.reply('Tupu!')
  }

  @Command({ name: 'claim', description: 'Claim your Paninerd Tokens!' })
  async claim2(interaction) {
    await interaction.reply('TBD')
  }
}
