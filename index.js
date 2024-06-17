const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // Botunuzun Client ID'sini buraya ekleyin
const GUILD_ID = 'YOUR_GUILD_ID_HERE'; // Sunucunuzun ID'sini buraya ekleyin

// Yeni bir Discord client'ı oluşturun
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
]
});

// Slash komutlarını kaydet
const commands = [
new SlashCommandBuilder()
.setName('say')
.setDescription('Bot belirttiğiniz mesajı yazar.')
.addStringOption(option =>
option.setName('message')
.setDescription('Botun yazacağı mesaj')
.setRequired(true)),
]
.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
try {
console.log('Slash komutları yükleniyor...');

await rest.put(
Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
{ body: commands },
);

console.log('Slash komutları yüklendi.');
} catch (error) {
console.error(error);
}
})();

client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;

const { commandName, options } = interaction;

if (commandName === 'say') {
const message = options.getString('message');
await interaction.reply(message);
}
});

client.login(process.env.TOKEN);