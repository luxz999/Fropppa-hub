const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const game_options = require('../utils/game_options')
const unique_embed = require('../utils/unique_embed')
const moment = require('moment')

module.exports = {
    admin_only: true,
    data: new SlashCommandBuilder()
        .setName("lookup")
        .setDescription("🔎 ส่อง Buyer!")
        .addSubcommand(sub =>
            sub
                .setName('user')
                .setDescription('ค้นหาจากบัญชีผู้ใช้และเกม')
                .addUserOption(op =>
                    op
                        .setName('user')
                        .setDescription('บัญชีผู้ใช้')
                        .setRequired(true)
                )
                .addNumberOption(game_options)
        )
        .addSubcommand(sub =>
            sub
                .setName('key')
                .setDescription('ค้นหาจากคีย์')
                .addStringOption(op =>
                    op
                        .setName('key')
                        .setDescription('คีย์')
                        .setRequired(true)
                )
        ),
    async run(client, interaction) {
        let key_info = {}
        if (interaction.options.getSubcommand() == "user") key_info = await interaction.LARB_API.get_key_discordid(interaction.options.getUser('user').id, interaction.options.getNumber('game'))
        else key_info = await interaction.LARB_API.get_key(interaction.options.getString('key'))
        interaction.editReply({
            embeds: [
                unique_embed()
                    .addField('🔐 Key', key_info.key)
                    .addField('🔐 Identifier', key_info?.hwid?.value || 'ไม่พบ')
                    .addField('🕹 Game', String(key_info.place_id))
                    .addField('👦🏻 Discord', `<@${key_info?.discord_id}>`)
                    .addField('⏰ ExpireIn', `${key_info.expireAt ? moment(key_info.expireAt).diff(moment().startOf('day'), 'days') + " วัน" : 'ไม่พบ'}`)
                    .addField('🏴 IsBlacklist', `${key_info?.blacklist?.isblacklist || false} ( ${key_info?.blacklist?.reason || 'No Message'} )`)
            ],
            ephemeral: true
        })
    }
}