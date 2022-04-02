module.exports =  {
    
    name: 'helado',
    aliases: ['nieve','helados'],
    description: '🍨',
  
    async execute(client, message, args, Discord) {

        var helado = [

            'https://media.discordapp.net/attachments/853500788848853002/873256608992493578/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256611202875412/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256621625720932/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256621726371870/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256631134191616/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256630983209020/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256636247060560/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256637744443443/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873256646833487922/9.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhelado = helado[Math.floor(Math.random()*helado.length)]

        while (!ramdonhelado || ramdonhelado === null || ramdonhelado === '' || ramdonhelado === undefined) {
            
            ramdonhelado = helado[Math.floor(Math.random()*helado.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está comiendo un refrescante helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot) {

            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Hace mucho frío! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Cafe`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, ${message.author.username} te invitó un poquito de helado.`)
            .setImage(ramdonhelado)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

        }

    }

}