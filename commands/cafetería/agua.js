module.exports =  {
    
    name: 'agua',
    aliases: ['agüita','awita'],
    description: '💧',
  
    async execute(client, message, args, Discord) {

        var agua = [

            'https://media.discordapp.net/attachments/853500788848853002/873251653703331900/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251656681287681/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251658048602162/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251666764369940/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251666684682321/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251671562649601/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251673533984818/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873252417158922250/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251676289642526/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873251681243107388/10.gif'    
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonagua = agua[Math.floor(Math.random()*agua.length)]
    
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está tomando awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no toman agüita! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un poquito de awita.`)
            .setImage(ramdonagua)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}