module.exports =  {
    
    name: 'vino',
    aliases: ['vinos','wine'],
    description: '🍷',
  
    async execute(client, message, args, Discord) {

        var vino = [

            'https://media.discordapp.net/attachments/853500788848853002/873264499136794634/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264498146947132/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264505319194644/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264513254842419/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264520636817449/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264526252982282/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264532909342750/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873264547471958086/9.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonvino = vino[Math.floor(Math.random()*vino.length)]

        while (!ramdonvino || ramdonvino === null || ramdonvino === '' || ramdonvino === undefined) {
            
            ramdonvino = vino[Math.floor(Math.random()*vino.length)]
            
        }

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está disfrutando un rico vino.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Eso si estaría cool!`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, aquí te traigo una copa de vino invitado por ${message.author.username}.`)
            .setImage(ramdonvino)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}