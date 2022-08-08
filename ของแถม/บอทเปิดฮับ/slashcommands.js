const services = require('./services')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

const commands = []
const commandsFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith("js"))

for (const file of commandsFiles) {
  const slash = require('./src/commands/' + file)
  commands.push(slash.data.toJSON())
}

console.log(commands);

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_CLIENT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');


    services.forEach(async service => {
      try {
        await rest.put(
          Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, service.guild_id),
          { body: commands },
        );
      } catch (err) {

      }
    })

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();