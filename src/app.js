import "../init.js";
import { Client } from "discord.js";

const client = new Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

const TOKEN = process.env.DISCORD_TOKEN;
if (TOKEN) {
  client.login(TOKEN);
} else {
  throw "No token provided";
}