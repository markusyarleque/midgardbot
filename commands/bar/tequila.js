module.exports =  {
    
    name: 'tequila',
    aliases: ['tequilas'],
    description: '🥃',
  
    async execute(client, message, args, Discord) {

        var tequila = [

            'https://media.discordapp.net/attachments/853500788848853002/873265180543418428/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265199627534366/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265215976914974/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265224277426296/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265229474177084/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265238122856468/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265247325139034/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265257508900914/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873265268946788462/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdontequila = tequila[Math.floor(Math.random()*tequila.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está disfrutando un tequilita.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Delicioso, pero... <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`Hey, **${img.user.username}**, toma este tequila invitado por ${message.author.username}.`)
            .setImage(ramdontequila)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}