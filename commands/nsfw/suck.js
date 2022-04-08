module.exports =  {
    
    name: 'suck',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var suck = [

            'https://i.imgur.com/8tNDy0b.gif',
            'https://i.imgur.com/eN2pDzF.gif',
            'https://i.imgur.com/yepHf1C.gif',
            'https://i.imgur.com/3yDLdW3.gif',
            'https://i.imgur.com/n22Et3Y.gif',
            'https://i.imgur.com/OKdYLjB.gif',
            'https://i.imgur.com/Aq4geKh.gif',
            'https://i.imgur.com/YVBeTp2.gif',
            'https://i.imgur.com/ZNXtTU5.gif',
            'https://i.imgur.com/LX79Thw.gif',
            'https://i.imgur.com/uqhMbWp.gif',
            'https://i.imgur.com/nYOKzRG.gif',
            'https://i.imgur.com/IkIe9jH.gif',
            'https://i.imgur.com/53DDlqk.gif',
            'https://i.imgur.com/DOu3fd9.gif',
            'https://i.imgur.com/WzHXSLX.gif',
            'https://i.imgur.com/KuagFzk.gif',
            'https://i.imgur.com/wPh8T3y.gif',
            'https://i.imgur.com/Oveu78B.gif',
            'https://i.imgur.com/rZ74uhd.gif',
            'https://i.imgur.com/bYa2Zjj.gif',
            'https://i.imgur.com/uAvs5UM.gif',
            'https://i.imgur.com/YOPeuhI.gif',
            'https://i.imgur.com/XtsVk8w.gif',
            'https://i.imgur.com/hMsxdgg.gif',
            'https://i.imgur.com/2HG1qnN.gif',
            'https://i.imgur.com/Nw4A6Sp.gif',
            'https://i.imgur.com/2XOgxy2.gif',
            'https://i.imgur.com/6E9kkuT.gif',
            'https://i.imgur.com/jiTVlOM.gif',
            'https://i.imgur.com/5x4uc5I.gif',
            'https://i.imgur.com/yw9FTFz.gif',
            'https://i.imgur.com/8jkU29V.gif',
            'https://i.imgur.com/W8kYDRy.gif',
            'https://i.imgur.com/exA8lQg.gif',
            'https://i.imgur.com/d2hpR2A.gif',
            'https://i.imgur.com/mSobSzh.gif',
            'https://i.imgur.com/T9geBv1.gif',
            'https://i.imgur.com/cs04hw4.gif',
          
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
            let ramdonsuck = suck[Math.floor(Math.random()*suck.length)]
            let desc 
    
            while (!ramdonsuck || ramdonsuck === null || ramdonsuck === '' || ramdonsuck === undefined) {
                
                ramdonsuck = suck[Math.floor(Math.random()*suck.length)]
                
            }

            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le provocó chupar pollas <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** se está comiendo la verga de **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonsuck)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}