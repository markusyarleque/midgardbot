module.exports =  {
    
    name: 'chocolate',
    aliases: ['choco'],
    description: '🍫',
  
    async execute(client, message, args, Discord) {

        var chocolate = [

            'https://media.discordapp.net/attachments/853500788848853002/873255248867786842/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255256513974362/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255257520623676/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255260850905099/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255265166823434/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255269952553030/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255276348842095/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255280169852958/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255283193942036/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873255288218738728/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonchocolate = chocolate[Math.floor(Math.random()*chocolate.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está comiendo un delicioso chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Nos encanta el chocolate! Pero... <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un rico chocolate.`)
            .setImage(ramdonchocolate)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}