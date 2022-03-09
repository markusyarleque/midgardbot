module.exports =  {
    
    name: 'redbull',
    aliases: ['redbulls'],
    description: '🥤',
  
    async execute(client, message, args, Discord) {

        var redbull = [

            'https://media.discordapp.net/attachments/853500788848853002/873261607185186816/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261612180594759/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261619923267584/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261626885832724/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261640022360114/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261667469885561/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261673811693690/7.gif?width=562&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873261678781923328/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261688919572520/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873261694267293777/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonredbull = redbull[Math.floor(Math.random()*redbull.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está energizándose con un Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Con o sin redbull podemos estar despiertos toda la noche! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una lata de Red Bull.`)
            .setImage(ramdonredbull)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}