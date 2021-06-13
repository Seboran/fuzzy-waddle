import '../init.js'
import {
  Client
} from 'discord.js'

import { Actions } from "./actions"

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const actions = new Actions();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const data = actions.getCommands();

  // Add command to DMs
  await client.application?.commands.set([])

  // Add command to each guild
  await Promise.all(
    client.guilds.cache.map(async (guild) => {
      await guild.commands
        .set(data)
        .then(() => console.log(`Set commands in ${guild.name}`))
        .catch((e) => {
          console.error(`Could not add command to ${guild.name}`)
          console.error(e)
        })
    }),
  )

  console.log('Set all commands')
})

client.on("message", actions.onMessage);

client.on('interaction', async (interaction) => {
  if (!interaction.isCommand()) return

  await actions.onInteraction(interaction)

})

const TOKEN = process.env.DISCORD_TOKEN
if (TOKEN) {
  client.login(TOKEN)
} else {
  throw 'No token provided'
}
