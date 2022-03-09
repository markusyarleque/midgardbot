module.exports =  {
    
    name: 'hamburguesa',
    aliases: ['burger','hamburguesas'],
    description: '🍔',
  
    async execute(client, message, args, Discord) {

        var hamburguesa = [

            'https://media.discordapp.net/attachments/853500788848853002/873257289824489542/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257293167341598/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257304760410132/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257304311623810/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257305150464020/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257311379009576/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257314461818891/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257316701577216/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257321256595496/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873257323034988554/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhamburguesa = hamburguesa[Math.floor(Math.random()*hamburguesa.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está comiendo una sabrosa hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no comen carne! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una gran hamburguesa.`)
            .setImage(ramdonhamburguesa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}