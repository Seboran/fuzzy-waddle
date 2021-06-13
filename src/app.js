import '../init.js'
import {
  Client,
  MessageActionRow,
  MessageButton,
  Permissions,
} from 'discord.js'

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const data = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ]

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

client.on('interaction', async (interaction) => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!')
  }
})

const TOKEN = process.env.DISCORD_TOKEN
if (TOKEN) {
  client.login(TOKEN)
} else {
  throw 'No token provided'
}
