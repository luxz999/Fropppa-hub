const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const game_options = require('../utils/game_options')
const unique_embed = require('../utils/unique_embed')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("rehwid")
        .setDescription("💣 Reset a Hardware ID")
        .addNumberOption(game_options),
    async run(client, interaction) {
        const game = interaction.options.getNumber("game")
        const key_info = await interaction.LARB_API.get_key_discordid(interaction.user.id, game)

        await interaction.LARB_API.delete_hwid(key_info.key)
        interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[^] Reset Hwid Success`))
            ],
            ephemeral: true
        })
    }
}