module.exports =  {
    
    name: 'sad',
    aliases: ['triste','depre'],
    description: '😔 Mood Sad.',
  
    async execute(client, message, args, Discord) { 
 
        var sad = [

            'https://media.discordapp.net/attachments/853500788848853002/876010421180563466/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010424993202186/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010430995255296/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010433377632256/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010448334520390/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010484392947722/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010494933233715/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010503179239444/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010512364732426/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010522091331584/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010530333143080/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010537761247232/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010558460145704/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010565389144084/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010575476432936/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010587409227776/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010603364360222/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010619541803018/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010627229949972/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876010637044617226/20.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonsad = sad[Math.floor(Math.random()*sad.length)]
    
        while (!ramdonsad || ramdonsad === null || ramdonsad === '' || ramdonsad === undefined) {
            
            ramdonsad = sad[Math.floor(Math.random()*sad.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** se puso modo depre.`)
            .setImage(ramdonsad)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false }, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Yo no ando sad! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** y **${img.user.username}** andan modo sad.`)
            .setImage(ramdonsad)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}