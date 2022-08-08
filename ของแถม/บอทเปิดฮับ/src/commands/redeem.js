const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("redeem")
        .setDescription("🔆 Redeem key to use")
        .addStringOption(option => option.setName('key').setDescription('คีย์').setRequired(true)),
    async run(client, interaction) {
        const key = interaction.options.getString('key');

        await interaction.LARB_API.redeem(key, interaction.user.id)
        const buyer_role = interaction.member.guild.roles.cache.find(role => role.id === interaction.LARB_API.info.buyer_role_id)
        if (buyer_role) interaction.member.roles.add(buyer_role).then().catch(err => { });
        interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[+] Redeem success!`))
            ],
            ephemeral: true
        })
    }
}