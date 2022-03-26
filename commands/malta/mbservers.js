module.exports =  {
    
    name: 'mbservers',
    aliases: ['mbs'],
    description: '💻 Comprueba en qué servidores está el bot.',

    async execute(client, message, args, Discord) {
    
        let id = ['753435606410985573','683501310527668228']

        if(!id.some(id => message.author.id == id)) {
      
            const embed = new Discord.MessageEmbed()
            .setDescription('Solo el developer del bot puede usar este comando.')
            .setColor('RED')
            
            return message.reply({ embeds: [embed] })
            .then(m => setTimeout(() => m.delete(), 5000)).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {

            const embed = new Discord.MessageEmbed()
            .setThumbnail('https://media.giphy.com/media/3rgXBsmYd60rL3w7sc/giphy.gif')
            .setAuthor({ name: 'MidgardBot', iconURL: client.user.avatarURL({ dynamic: true}) })
            .setTitle('⁛ Lista de servidores ⁛')
            .setDescription('**⁛ Desarrollador: ↴**\n\n```Maltazard#1207```\n\n**⁛ Usuarios: ↴**\n\n```'+client.users.cache.size+' usuarios usan mis comandos.```\n\n**⁛ Servidores: ↴**\n\n```Actualmente estoy en '+client.guilds.cache.size+' servers.```\n\n')
            .addField('\u200B','\u200B')
            .addField('Nombre: ','``` - ' + client.guilds.cache.map(r => r.name).join(". \n - ")+'```',true)
            .addField('Id: ','``` - ' + client.guilds.cache.map(r => r.id).join(". \n - ")+'```',true)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `Malta's Bot`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}` })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        }
    
    }

}