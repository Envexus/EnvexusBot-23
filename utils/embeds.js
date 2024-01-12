const { EmbedBuilder } = require('discord.js');
const { staffApplication, builderApplication } = require(`./applications`)


const applicationEmbed = new EmbedBuilder()
.setDescription(staffApplication)
.setTitle('Envexus Staff Application')
.setColor('DarkVividPink')

const builderEmbed = new EmbedBuilder()
.setDescription(builderApplication)
.setTitle('Envexus Builder Application')
.setColor('DarkVividPink')



module.exports = { applicationEmbed, builderEmbed };