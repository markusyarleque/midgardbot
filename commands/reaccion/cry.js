module.exports =  {
    
    name: 'cry',
    aliases: ['llorar'],
    description: '😭 Mood Sad 2.0.',
    use: '<prefix><name> [@user/id]',
    category: 'Reacción 😎',
    vip: false,
    owner: false,
  
    async execute(client, message, args, Discord) { 

        var cry = [

            'https://i.imgur.com/8DVpOTa.gif',
            'https://i.imgur.com/5IA4uW0.gif',
            'https://i.imgur.com/aI74vFE.gif',
            'https://i.imgur.com/jNb04eX.gif',
            'https://i.imgur.com/wxy1x0k.gif',
            'https://i.imgur.com/hSVOi9b.gif',
            'https://i.imgur.com/wsTFj83.gif',
            'https://i.imgur.com/8xD6ISU.gif',
            'https://i.imgur.com/YNrMxRA.gif',
            'https://i.imgur.com/sveuUGa.gif',
            'https://i.imgur.com/fWO8bLM.gif',
            'https://i.imgur.com/tdCURDt.gif',
            'https://i.imgur.com/aqfnGJf.gif',
            'https://i.imgur.com/gDUtb82.gif',
            'https://i.imgur.com/k9Cwb2M.gif',
            'https://i.imgur.com/bhnhPv7.gif',
            'https://i.imgur.com/lapGyST.gif',
            'https://i.imgur.com/vqQeHfB.gif',
            'https://i.imgur.com/3dNiwMh.gif',
            'https://i.imgur.com/REI1tEP.gif',
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncry = cry[Math.floor(Math.random()*cry.length)]
    
        while (!ramdoncry || ramdoncry === null || ramdoncry === '' || ramdoncry === undefined) {
            
            ramdoncry = cry[Math.floor(Math.random()*cry.length)]

        }
        
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/MNWYvup.gif' })

            message.channel.send({ embeds: [embed] }).then((m) => {
                
                console.log(JSON.stringify(m.embeds, ['image','url']))

            }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false }, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Si pudiera llorar, te ayudaría! <:procesando:932177969017925632>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** y **${img.user.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : 'https://i.imgur.com/MNWYvup.gif' })

            message.channel.send({ embeds: [embed] }).then((m) => {
                
                console.log(JSON.stringify(m.embeds, ['image','url']))

            }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}