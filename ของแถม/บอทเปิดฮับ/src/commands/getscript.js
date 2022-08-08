const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const game_options = require('../utils/game_options')
const unique_embed = require('../utils/unique_embed')
const moment = require('moment')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getscript")
        .setDescription("💌 Can Run Script Now!")
        .addNumberOption(game_options),
    async run(client, interaction) {
        const game = interaction.options.getNumber("game")

        const key_info = await interaction.LARB_API.get_key_discordid(interaction.user.id, game)
        interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('⏰ ExpireIn', `${key_info.expireAt ? moment(key_info.expireAt).diff(moment().startOf('day'), 'days') + " วัน" : 'ไม่พบ'}`)
                    .setDescription(codeBlock('lua', interaction.LARB_API.info.script_template.replace('{{KEY}}', key_info.key)))
            ],
            ephemeral: true
        })
    }
}