module.exports =  {
    
    name: 'te',
    aliases: ['té','tesito'],
    description: '🧉',
  
    async execute(client, message, args, Discord) {

        var te = [

            'https://media.discordapp.net/attachments/853500788848853002/873253192979341372/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253194308927568/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253202332614686/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253207659409408/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253209660084234/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253212776431697/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253221093740544/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253223014727771/8.gif?width=863&height=484',
            'https://media.discordapp.net/attachments/853500788848853002/873253231088767016/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873253257718415380/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonte = te[Math.floor(Math.random()*te.length)]
      
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está relajándose con un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Nada mal un buen tesito! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ponte cómodo y relájate, que ${message.author.username} te ha invitado un tesito.`)
            .setImage(ramdonte)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
      
        }

    }

}