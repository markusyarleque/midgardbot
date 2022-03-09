module.exports =  {
    
    name: 'tacos',
    aliases: ['taquitos'],
    description: '🌮',
  
    async execute(client, message, args, Discord) {

        var tacos = [

            'https://media.discordapp.net/attachments/942248708421075024/942249247615631360/1.gif?width=225&height=169',
            'https://media.discordapp.net/attachments/942248708421075024/942249247942770758/2.gif?width=369&height=206',
            'https://media.discordapp.net/attachments/942248708421075024/942249248307679262/3.gif?width=375&height=278',
            'https://media.discordapp.net/attachments/942248708421075024/942249248626466867/4.gif?width=360&height=210',
            'https://media.discordapp.net/attachments/942248708421075024/942249249255587871/5.gif?width=375&height=375',
            'https://media.discordapp.net/attachments/942248708421075024/942249250073501696/6.gif?width=338&height=225',
            'https://media.discordapp.net/attachments/942248708421075024/942249250690048081/7.gif?width=375&height=225',
            'https://media.discordapp.net/attachments/942248708421075024/942249250987868240/8.gif?width=731&height=240',
            'https://media.discordapp.net/attachments/942248708421075024/942249251692507186/9.gif?width=386&height=218',
            'https://media.discordapp.net/attachments/942248708421075024/942249252254527488/10.gif?width=360&height=210'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdontacos = tacos[Math.floor(Math.random()*tacos.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está comiendo unos tacos.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Se me antoja... pero <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un rico taco.`)
            .setImage(ramdontacos)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}