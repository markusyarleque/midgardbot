module.exports =  {
    
    name: 'huca',
    aliases: ['hooka','hookah'],
    description: '🚬',
  
    async execute(client, message, args, Discord) {

        var huca = [

            'https://media.discordapp.net/attachments/853500788848853002/873273468462989342/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273476625076264/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273480441917470/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273489061191751/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273498175434832/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273507893637130/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273520304586802/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273530479955998/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273544077873213/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273554320359454/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873273559781343242/11.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhuca = huca[Math.floor(Math.random()*huca.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`A **${message.author.username}** le apeteció una pipa bien potente.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿Huca? ¿Qué es eso? <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`**${img.user.username}**, disfruta de la hookah que te invitó ${message.author.username}.`)
            .setImage(ramdonhuca)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}