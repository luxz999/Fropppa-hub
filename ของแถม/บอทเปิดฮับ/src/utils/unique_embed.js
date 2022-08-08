const DiscordJS = require('discord.js')
module.exports = () => new DiscordJS.MessageEmbed()
.setTitle("Whitelist Manager")
.setFooter({
    text: "ลาบ.com - #1 Roblox Licensing System",
    iconURL: 'https://i.ytimg.com/vi/UFbFNBBEoOQ/maxresdefault.jpg'
})
.setColor("#0097ff")
.setTimestamp()