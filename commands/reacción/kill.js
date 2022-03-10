module.exports =  {
    
    name: 'kill',
    aliases: ['matar','asesinar'],
    description: '💀 Mata a alguien.',
  
    async execute(client, message, args, Discord) { 

        var kill = [

            'https://media.discordapp.net/attachments/879633476532453386/883536186877050890/1.gif?width=448&height=252',
            'https://media.discordapp.net/attachments/879633476532453386/883536204539240459/2.gif?width=448&height=250',
            'https://media.discordapp.net/attachments/879633476532453386/883551478579593306/3.gif?width=461&height=319',
            'https://media.discordapp.net/attachments/879633476532453386/883551490134900737/4.gif?width=432&height=225',
            'https://media.discordapp.net/attachments/879633476532453386/883551495772078080/5.gif?width=448&height=301',
            'https://media.discordapp.net/attachments/879633476532453386/883551507964919848/6.gif?width=378&height=252',
            'https://media.discordapp.net/attachments/879633476532453386/883551517704089620/7.gif?width=450&height=270',
            'https://media.discordapp.net/attachments/879633476532453386/883551529758507009/8.gif?width=450&height=248',
            'https://media.discordapp.net/attachments/879633476532453386/883551545571037244/9.gif?width=450&height=249',
            'https://media.discordapp.net/attachments/879633476532453386/883551557835182170/10.gif?width=315&height=180',
            'https://media.discordapp.net/attachments/879633476532453386/883551576038457354/11.gif?width=364&height=204',
            'https://media.discordapp.net/attachments/879633476532453386/883551582589976696/12.gif?width=220&height=180',
            'https://media.discordapp.net/attachments/879633476532453386/883551600801640478/13.gif?width=288&height=216',
            'https://media.discordapp.net/attachments/879633476532453386/883551612801544212/14.gif?width=432&height=178',
            'https://media.discordapp.net/attachments/879633476532453386/883551622565863484/15.gif?width=360&height=193'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonkill = kill[Math.floor(Math.random()*kill.length)]
    
        if (!img || img.id === message.author.id) {
    
            return message.reply({embeds: [
            
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Que alguién lo detenga, por favor! <a:stitchsad:925931908918046790>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡No puedes matar a un bot! <:pepemaje:932177727589589013>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Emotions 🤗`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** acaba de masacrar a **${img.user.username}**.`)
            .setImage(ramdonkill)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}
    