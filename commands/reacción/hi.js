module.exports =  {
    
    name: 'hi',
    aliases: ['hola','saludar'],
    description: '👋 Saluda a un miembro del servidor o a todos.',
  
    async execute(client, message, args, Discord) {

        var hi = [

            'https://media.discordapp.net/attachments/853500788848853002/873248866462466149/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248868052115476/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248872942669904/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248873714421800/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248878453993512/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248880144310373/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248880467271740/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248884011458630/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248889766019072/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248891519262850/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873249148839788564/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873249151649988658/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248910737559613/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248928181661796/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873248934749945886/15.gif'

        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonhi = hi[Math.floor(Math.random()*hi.length)]
     
        while (!ramdonhi || ramdonhi === null || ramdonhi === '' || ramdonhi === undefined) {
            
            ramdonhi = hi[Math.floor(Math.random()*hi.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Emotions 🤗`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** está saludando a todos.`)
            .setImage(ramdonhi)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Holi, soy tu bot de confianza! <:burbujita:930399322183458867>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}**, está saludando a ${message.author.username}.`)
            .setImage(ramdonhi)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        }

    }

}