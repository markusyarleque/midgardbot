const { Permissions } = require('discord.js');
module.exports =  {
    
    name: 'reglas',
    aliases: ['rules'],
    description: '🛑 Muestra las reglas del servidor.',
  
    async execute(client, message, args, Discord) {

        let permisos = message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    
        if(!permisos) return

        const btn1 = new Discord.MessageButton()
        .setCustomId('acp')
        .setLabel('Aceptar')
        .setStyle('SUCCESS')

        const btn2 = new Discord.MessageButton()
        .setCustomId('deny')
        .setLabel('Denegar')
        .setStyle('DANGER')

        const fila = new Discord.MessageActionRow().addComponents(btn1,btn2)

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`Prueba`)

        message.channel.send({ embeds: [embed], components: [fila]})

    }

}