const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const game_options = require('../utils/game_options')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    admin_only: true,
    data: new SlashCommandBuilder()
        .setName("genkey")
        .setDescription("🧬 สร้างคีย์!")
        .addNumberOption(game_options)
        .addIntegerOption(option => option.setName('amount').setDescription('จำนวน').setRequired(true)),
    async run(client, interaction) {
        const amount = interaction.options.getInteger('amount')
        const placeid = interaction.options.getNumber('game')

        const key_added = await interaction.LARB_API.gen_key(amount, placeid)
        const key_string = key_added.map(_ => _.key).join("\n")
        await interaction.editReply({
            files: [{
                attachment: new Buffer.from(key_string),
                name: 'keys.txt'
            }],
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[+] สร้าง ${amount} คีย์สำเร็จแล้ว!`))
            ],
            ephemeral: true
        }).catch(err => { })
    }
}