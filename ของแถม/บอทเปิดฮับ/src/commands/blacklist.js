const { SlashCommandBuilder, SlashCommandUserOption, codeBlock } = require('@discordjs/builders')
const DiscordJS = require('discord.js')
const unique_embed = require('../utils/unique_embed')

module.exports = {
    admin_only: true,
    data: new SlashCommandBuilder()
        .setName("blacklist")
        .setDescription("🎩 บัญชีดำ!")
        .addStringOption(option => option.setName("key").setDescription("คีย์").setRequired(true))
        .addStringOption(option => option.setName("message").setDescription("ข้อความ"))
        .addBooleanOption(option => option.setName("state").setDescription("หากไม่ใส่ระบบจะทำการ toggle state")),
    async run(client, interaction) {
        const key = interaction.options.getString('key')
        const message = interaction.options.getString('message')
        const state = interaction.options.getBoolean('state')

        const blacklist = await interaction.LARB_API.blacklist_key(key, message, state)
        interaction.editReply({
            embeds: [
                unique_embed()
                    .setDescription(codeBlock('css', `[+] อัพเดทบัญชีดำ "${blacklist["key"]}" เป็น "${String(blacklist.blacklist.isblacklist).toUpperCase()}" สำเร็จ!`))
            ],
            ephemeral: true
        }).catch(err => { })
    }
}