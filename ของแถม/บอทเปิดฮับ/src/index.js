const { codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const fs = require('fs');
const dotenv = require('dotenv')
const LARB_API = require('./libs/ลาบ-api');
const unique_embed = require('./utils/unique_embed');
dotenv.config()

const client = new DiscordJS.Client({
    intents: [DiscordJS.Intents.FLAGS.GUILDS, DiscordJS.Intents.FLAGS.GUILD_MESSAGES]
})

client.commands = new DiscordJS.Collection();
const commandsFiles = fs.readdirSync(__dirname+"/commands").filter(file => file.endsWith("js"))

for (const file of commandsFiles) {
    const slash = require(__dirname+'/commands/' + file)
    client.commands.set(slash.data.name, slash)
}
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const cmd = client.commands.get(interaction.commandName)
    if (!cmd) return;
    try {
        await interaction.deferReply({
            ephemeral: true
        })
        interaction.LARB_API = client.LARB_API[interaction.guild.id]
        if (!interaction.LARB_API) return await interaction.guild.leave().catch(_ => { })
        interaction.LARB_API.info = await interaction.LARB_API.get_info()
        if (cmd.admin_only && !interaction.member.roles.cache.some(role => role.id === interaction.LARB_API.info.whitelist_access_id)) return interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', '[*] You are not authorized to use this command.'))
            ],
            ephemeral: true
        }).catch(err => { })


        await cmd.run(client, interaction)
    } catch (error) {
        const error_data = error?.response?.data
        if (error.isAxiosError) return interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('🔴 Status', error_data ? `${error_data.statusCode} - ${error_data.error}` : "No Meessage")
                    .addField('📑 Message', error?.response?.data?.message || "No Message")
            ],
            ephemeral: true
        }).catch(err => { })

        interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('📑 Message', error?.message || "No Message")
            ],
            ephemeral: true
        }).catch(err => { })
    }
})

const services = require('../services')

client.on('ready', () => {
    client.LARB_API = {}
    services.forEach(service => {
        if (client.guilds.cache.get(service.guild_id)) {
            client.LARB_API[service.guild_id] = new LARB_API(service.secret_key)
        }
    })
    console.log('logged as ' + client.user.tag);
    let timer = setInterval(() => {
        try {
            client.user.setActivity(`By x2tawan#0001`, { type: 'PLAYING' });
        } catch (error) {
            clearInterval(timer)
        }
    }, 1000 * 20);

    client.user.setActivity(`By x2tawan#0001`, { type: 'PLAYING' });
})

client.login(process.env.DISCORD_CLIENT_TOKEN)