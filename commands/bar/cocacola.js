module.exports =  {
    
    name: 'cocacola',
    aliases: ['cocacolas'],
    description: '🥤',
  
    async execute(client, message, args, Discord) {

        var cocacola = [

            'https://media.discordapp.net/attachments/853500788848853002/873260856115363850/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260863904186368/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260873735602236/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260876692590625/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260886180134922/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260894589710417/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260904341463061/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873260912889438228/8.gif?width=401&height=561',
            'https://media.discordapp.net/attachments/853500788848853002/873260933282164796/10.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncocacola = cocacola[Math.floor(Math.random()*cocacola.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está refrescándose con una Coca Cola.`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL()})
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | La cocacola daña nuestros circuitos! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Bar`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó una Coca Cola... Disfrútala!`)
            .setImage(ramdoncocacola)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif'})
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}