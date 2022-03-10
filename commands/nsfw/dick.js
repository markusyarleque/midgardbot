module.exports =  {
    
    name: 'dick',
    aliases: ['cock','pene'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var dick = [

            'https://media.discordapp.net/attachments/864730574877884516/877034616706441236/big-dick-3271.gif?width=434&height=562',
            'https://media.discordapp.net/attachments/864730574877884516/877034770406707251/5c2614b11a322.gif?width=540&height=304',
            'https://media.discordapp.net/attachments/864730574877884516/877034931522531348/370_1000.gif?width=382&height=429',
            'https://media.discordapp.net/attachments/864730574877884516/877035160590249994/big-dick-3256.gif?width=418&height=306',
            'https://media.discordapp.net/attachments/864730574877884516/877035417449410560/big-dick-3304.gif?width=450&height=252',
            'https://media.discordapp.net/attachments/864730574877884516/877036078824063006/big-dick-3268.gif?width=382&height=337',
            'https://media.discordapp.net/attachments/864730574877884516/877036445104209981/tumblr_mcqj34jvVg1qjlerno1_500.gif?width=405&height=304',
            'https://media.discordapp.net/attachments/864730574877884516/877037189400244244/nude-brides-big-dick-gif-2.gif?width=270&height=152',
            'https://media.discordapp.net/attachments/864730574877884516/877037323878010890/unnamed.gif?width=450&height=202',
            'https://media.discordapp.net/attachments/864730574877884516/877037530493620324/564_1000.gif?width=609&height=329',
            'https://media.discordapp.net/attachments/864730574877884516/877037779492700180/023_1000.gif?width=450&height=346',
            'https://media.discordapp.net/attachments/864730574877884516/877038030102364180/tumblr_ly164a9Hqe1qj9arwo1_500.gif?width=450&height=308',
            'https://media.discordapp.net/attachments/864730574877884516/877038335971983361/tumblr_05db2d2b868b226ff261ab5329b6e2cc_dff06e3d_500.gif?width=450&height=225',
            'https://media.discordapp.net/attachments/864730574877884516/877038800642138122/big-dicks-gifs-xxx-1.gif?width=432&height=324',
            'https://media.discordapp.net/attachments/864730574877884516/877039232445722644/pic_1_big.gif?width=162&height=288',
            'https://media.discordapp.net/attachments/864730574877884516/877039756905676840/gay.hiqqu.com-7b99c3039e6790df35901a3b296046744f909ffc.gif?width=446&height=432',
            'https://media.discordapp.net/attachments/864730574877884516/877040542914056292/Seleccion_de_Gifts_75.gif?width=360&height=240',
            'https://media.discordapp.net/attachments/864730574877884516/877040909357838346/0026070.gif?width=302&height=454',
            'https://media.discordapp.net/attachments/864730574877884516/877041171996745728/1_water_tumblr_nvwk37327s1seg91yo1_400.gif?width=288&height=216',
            'https://media.discordapp.net/attachments/864730574877884516/877041416344326144/ezgif.com-crop6.gif?width=392&height=252'
          
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