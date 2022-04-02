module.exports =  {
    
    name: 'punch',
    aliases: ['puñetear','golpear','golpe','puñete'],
    description: '👊 Tira un golpe a alguien.',
  
    async execute(client, message, args, Discord) { 

        var punch = [

            'https://media.discordapp.net/attachments/853500788848853002/873321715109867593/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321724203134986/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321734525321216/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321746290331688/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321754003656774/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321768885026876/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321775038099526/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321791907586068/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321811515953172/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321829765353522/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321839814918224/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321874237558815/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321876708032592/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321887307005993/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321899856379974/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321908211445781/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321920362344458/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321944374714448/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321953853837342/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321964360585326/20.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321988746264647/21.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873321997675925624/22.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322022967603240/23.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322039363137586/24.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322050234757240/25.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322061110579220/26.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322076214292551/27.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322091812884500/28.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322108283916298/29.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873322125799338005/30.gif'
        
        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdonpunch = punch[Math.floor(Math.random()*punch.length)]
    
        if (!img || img.id === message.author.id) {
    
            return message.reply({embeds: [
            
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¿Te golpearías a ti mismo? <:maje:925927838492811295>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
    
        } else if (img.user.bot){
          
            return message.reply({ allowedMentions: { repliedUser: false}, embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | ¡Qué lindo eres pegándole a un bot! <:procesando:932177969017925632>`)
          
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
          
        } else {
    
            while (!ramdonpunch || ramdonpunch === null || ramdonpunch === '' || ramdonpunch === undefined) {
                
                ramdonpunch = punch[Math.floor(Math.random()*punch.length)]

            }
            
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Midgard's Love 💞`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${message.author.username}** le dió un puñetazo a **${img.user.username}**.`)
            .setImage(ramdonpunch)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.channel.send({ embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        }

    }

}