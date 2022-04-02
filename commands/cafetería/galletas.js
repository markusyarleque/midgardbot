module.exports =  {
    
    name: 'galletas',
    aliases: ['galleta','cookies'],
    description: '🍪',
  
    async execute(client, message, args, Discord) {

        var galletas = [

            'https://media.discordapp.net/attachments/853500788848853002/873256019055218728/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256023417303171/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256029528412160/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256030933516298/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256037296259113/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256038139330560/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256047668756570/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256056501968946/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256060956340284/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdongalletas = galletas[Math.floor(Math.random()*galletas.length)]

        while (!ramdongalletas || ramdongalletas === null || ramdongalletas === '' || ramdongalletas === undefined) {
            
            ramdongalletas = galletas[Math.floor(Math.random()*galletas.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`A **${message.author.username}** se le antojaron unas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no comen galletas! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó unas sabrosas galletitas.`)
            .setImage(ramdongalletas)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}