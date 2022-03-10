module.exports =  {
    
    name: 'cerveza',
    aliases: ['cervezas','beer'],
    description: '🍺',
  
    async execute(client, message, args, Discord) {

        var cerveza = [

            'https://media.discordapp.net/attachments/853500788848853002/873263878727942144/1.gif?width=351&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873263891113705552/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263900689317888/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263903214288896/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263907924496384/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263917449748511/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263919823716352/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263927893586010/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873263932545040405/9.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncerveza = cerveza[Math.floor(Math.random()*cerveza.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está tomando una cervecita.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman cerveza, no nos causa nada pero igual! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })})
            .setDescription(`Hey, **${img.user.username}**, disfruta tu cerveza invitada por ${message.author.username}.`)
            .setImage(ramdoncerveza)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}