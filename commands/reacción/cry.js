module.exports =  {
    
    name: 'cry',
    aliases: ['llorar'],
    description: '😭 Mood Sad 2.0.',
  
    async execute(client, message, args, Discord) { 

        var cry = [

            'https://media.discordapp.net/attachments/853500788848853002/876015088862122025/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015121032417310/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015140665958471/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015158143647774/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015162648322088/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015167698255933/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015171091464192/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015174434308106/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015173297635348/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015176174936085/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015177315803156/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015179710754856/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015188405518377/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015184878133298/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015194181103636/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015195774939166/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015199612698634/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015203173662731/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015211444830218/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/876015215681110056/20.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncry = cry[Math.floor(Math.random()*cry.length)]
    
        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** no llores, Te queremos ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] });
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false }, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Si pudiera llorar, te ayudaría! <:procesando:932177969017925632>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Sad 😔`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** y **${img.user.username}** no lloren, el Staff Los quiere ❤`)
            .setImage(ramdoncry)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}