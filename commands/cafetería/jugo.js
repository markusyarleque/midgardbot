module.exports =  {
    
    name: 'jugo',
    aliases: ['juguito'],
    description: '🧃',
  
    async execute(client, message, args, Discord) {

        var jugo = [

            'https://media.discordapp.net/attachments/853500788848853002/873253956577529987/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253962646700082/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253969231761508/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253973686124674/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253980665438268/5.gif?width=601&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873253982783557632/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253986621349968/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253996901572618/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873254004593934346/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonjugo = jugo[Math.floor(Math.random()*jugo.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está tomando un delicioso juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman juguito! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un juguito.`)
            .setImage(ramdonjugo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}