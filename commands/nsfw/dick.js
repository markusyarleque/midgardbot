module.exports =  {
    
    name: 'dick',
    aliases: ['cock','pene'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var dick = [

            'https://i.imgur.com/AQKhAJv.gif',
            'https://i.imgur.com/WqxrHKj.gif',
            'https://i.imgur.com/Naga2kV.gif',
            'https://i.imgur.com/ZZkdl9v.gif',
            'https://i.imgur.com/jCyHSBu.gif',
            'https://i.imgur.com/KRaF5Hg.gif',
            'https://i.imgur.com/ie4HLob.gif',
            'https://i.imgur.com/03J4MiU.gif',
            'https://i.imgur.com/ypfd1uu.gif',
            'https://i.imgur.com/8UZa1nL.gif',
            'https://i.imgur.com/Tjtjdjb.gif',
            'https://i.imgur.com/5Ma6iof.gif',
            'https://i.imgur.com/oT8YusK.gif',
            'https://i.imgur.com/gI97QnB.gif',
            'https://i.imgur.com/ZMnqC8s.gif',
            'https://i.imgur.com/Jv2PXeS.gif',
            'https://i.imgur.com/B59jPi6.gif',
            'https://i.imgur.com/7CZjMI7.gif',
            'https://i.imgur.com/yXsMcLo.gif',
            'https://i.imgur.com/jN3jNna.gif',
          
        ]
  
        if(!message.channel.nsfw){
          
            return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                .setColor('RED')
                .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>`)
  
            ]}).catch((e) => console.log('Error al enviar mensaje: '+e))
        
        } else {
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdondick = dick[Math.floor(Math.random()*dick.length)]
            let desc 
    
            while (!ramdondick || ramdondick === null || ramdondick === '' || ramdondick === undefined) {

                ramdondick = dick[Math.floor(Math.random()*dick.length)]
                
            }
            
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le provocó una rica polla <a:pandanoveo:880306441926352916> `
          
            } else {
      
                desc = `**${message.author.username}** anda viendo la verga de **${img.user.username}** <a:pandanoveo:880306441926352916> `
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdondick)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}