const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    admin_only: true,
    data: new SlashCommandBuilder()
        .setName("removekey")
        .setDescription("🚮 ลบคีย์!")
        .addStringOption(option => option.setName("key").setDescription("คีย์").setRequired(true)),
    async run(client, interaction) {
        const key = interaction.options.getString('key')

        await interaction.LARB_API.remove_key(key)
        interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[+] Remove success!`))
            ],
            ephemeral: true
        })
    }
}