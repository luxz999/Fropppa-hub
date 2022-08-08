const { SlashCommandBuilder } = require('@discordjs/builders')
const game_options = require('../utils/game_options')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getrole")
        .setDescription("🍖 Get a role")
        .addNumberOption(game_options),
    async run(client, interaction) {
        const game = interaction.options.getNumber("game")

        const key_info = await interaction.LARB_API.get_key_discordid(interaction.user.id, game)

        const buyer_role = interaction.member.guild.roles.cache.find(role => role.id === interaction.LARB_API.info.buyer_role_id)
        if (interaction.member.roles.cache.has(buyer_role.id)) return interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('✉ Message', `You already have a buyer role`)
            ],
            ephemeral: true
        })

        interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('✉ Message', `Give role successfully`)
            ],
            ephemeral: true
        })
    }
}