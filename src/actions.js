export class Actions {

  getCommands() {
    return [];
  }

  async onMessage(message) {

  }

  async onInteraction(interaction) {
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!')
    }
  }

}