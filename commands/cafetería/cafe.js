module.exports =  {
    
    name: 'cafe',
    aliases: ['café','cafecito'],
    description: '☕',
  
    async execute(client, message, args, Discord) {
 
        var cafe = [

            'https://media.discordapp.net/attachments/853500788848853002/873251089703653396/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251090114707476/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251094371909692/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251095122690178/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251098222264360/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251121710395432/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251127439794226/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251134830161971/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251134825980034/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251136134602832/10.gif',
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncafe = cafe[Math.floor(Math.random()*cafe.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** tomó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Mucho café nos pone nerviosos! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una taza de café.`)
            .setImage(ramdoncafe)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}