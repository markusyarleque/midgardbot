module.exports =  {
    
    name: 'k3',
    aliases: ['ktres','kiss-3','kiss3','kisstres'],
    description: '😘 Un beso en la mejilla.',
  
    async execute(client, message, args, Discord) { 

        var k3 = [
            
            'https://c.tenor.com/b0uJhtYcwE8AAAAC/friends-kiss.gif',
            'https://c.tenor.com/1eDAyUfJZ0UAAAAC/besodetres.gif',
            'https://64.media.tumblr.com/tumblr_m5sha6PfSD1r4plkdo1_400.gifv',
            'https://c.tenor.com/TH-I9zT0QWcAAAAd/beso-triple.gif',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
           
        ]

        let img1 = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let img2 = message.guild.members.resolve(message.mentions.users.first(2) || client.users.cache.get(args[1]));
        console.log('user: '+message.mentions.users.first()+' - user fisrt 1: '+message.mentions.users.first(1)+' - user fisrt 2: '+message.mentions.users.first(2))
        console.log('user 1: '+img1+' - user 2: '+img2)
        let ramdonk3 = k3[Math.floor(Math.random()*k3.length)]

        while (ramdonk3 === null || ramdonk3 === '') {
            
            ramdonk3 = k3[Math.floor(Math.random()*k3.length)]

        }

        if (!img1 || !img2 || img1.id === message.author.id || img2.id === message.author.id) return message.reply({embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Necesitas mencionar a 2 personas más... <:burbujita:930399322183458867>`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        if (img1.user.bot || img2.user.bot) return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
            new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
            .setColor('RED')
            .setDescription(`<a:Verify2:931463492677017650> | Necesitas mencionar a 2 personas más... <:burbujita:930399322183458867>`)
        
        ]}).catch((e) => console.log('Error al enviar mensaje: '+e))

        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
        .setDescription(`**${message.author.username}** se está besando con **${img1.user.username}** y **${img2.user.username}** <:mmm:880308330894090241>`)
        .setImage(ramdonk3)
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
  
        message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))

    }

}