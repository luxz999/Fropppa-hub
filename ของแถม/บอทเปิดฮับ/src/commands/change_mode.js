const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    admin_only: true,
    data: new SlashCommandBuilder()
        .setName("changemode")
        .setDescription("🥂 เปลี่ยนโหมด")
        .addStringOption(option => option.setName('mode').setDescription('โหมด')
            .addChoice("ชั่วคราว ( รายเดือน )", "TEMPORARY")
            .addChoice("ถาวร", "FOREVER")
            .setRequired(true)),
    async run(client, interaction) {
        let res = await interaction.LARB_API.change_mode(interaction.options.getString('mode'))
        interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[+] เปลี่ยนโหมดเป็น ${res.whitelist_mode} สำเร็จแล้ว!`))
            ],
            ephemeral: true
        })
    }
}