module.exports =  {
    
    name: 'salsa',
    aliases: [],
    description: '💃',
  
    async execute(client, message, args, Discord) {

        var salsa = [

            'https://media.discordapp.net/attachments/853500788848853002/873277547759140884/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277558421090314/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277570261606450/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277582743863326/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277597226790932/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277604340334682/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277631984971836/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277638163193866/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277648464388176/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277659109544016/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873277666562818098/11.gif'
        
        ]
        
        var salsa2 = [

            'https://media.discordapp.net/attachments/853500788848853002/873278131887296573/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873278143283200091/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873278151998992434/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873278166683238480/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873278181459775558/16.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonsalsa = salsa[Math.floor(Math.random()*salsa.length)]
        let ramdonsalsa2 = salsa2[Math.floor(Math.random()*salsa2.length)]
      
        while (!ramdonsalsa || ramdonsalsa === null || ramdonsalsa === '' || ramdonsalsa === undefined) {
            
            ramdonsalsa = salsa[Math.floor(Math.random()*salsa.length)]

        }
        
        while (!ramdonsalsa2 || ramdonsalsa2 === null || ramdonsalsa2 === '') {
            
            ramdonsalsa2 = salsa2[Math.floor(Math.random()*salsa2.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** salsea como los dioses.`)
            .setImage(ramdonsalsa2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot){
          
            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Yo si salseo como los dioses! <:nogarsias:932172183453712415>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Disco`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${img.user.username}** y ${message.author.username} están salseando juntos.`)
            .setImage(ramdonsalsa)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}