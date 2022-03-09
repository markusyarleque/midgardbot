module.exports =  {
    
    name: 'porro',
    aliases: ['mota'],
    description: '🚬',
  
    async execute(client, message, args, Discord) {

        var porro = [

            'https://media.discordapp.net/attachments/853500788848853002/873270304313597972/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270307308331068/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270321959010374/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270325566115900/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270334768431144/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270338304213012/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873270339344412712/8.gif',
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonporro = porro[Math.floor(Math.random()*porro.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está volando con un porro de mota.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Los bots no necesitan porro! <:nogarsias:932172183453712415>`)
          
            ]})

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, disfruta de esta mota que te ha invitado ${message.author.username}.`)
            .setImage(ramdonporro)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] })

        }

    }

}