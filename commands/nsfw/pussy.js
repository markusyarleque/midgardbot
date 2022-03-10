module.exports =  {
    
    name: 'pussy',
    aliases: ['vagina','coño'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var pussy = [

            'https://media.discordapp.net/attachments/853500788848853002/873855783970963476/1.gif?width=863&height=485',
            'https://media.discordapp.net/attachments/853500788848853002/873855793898872852/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855813557579807/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855833899941898/4.gif?width=863&height=485',
            'https://media.discordapp.net/attachments/853500788848853002/873855841156083722/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855854959554570/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855898647420959/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855905266012180/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855924295569428/9.gif?width=315&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873855934160584725/10.gif?width=315&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873855954385510400/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855972471345162/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873855982646747146/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856008907284500/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856026661769247/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856032164679700/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856047180312576/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856051726917662/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856063932338216/20.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856076188110858/21.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856087667929118/22.gif?width=586&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873856098820562944/23.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856113362227230/24.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856132471468052/25.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856145842896896/26.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856165556158504/27.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856178789154816/28.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856195633496094/29.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856229225685032/30.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856240927801344/31.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856261085626388/32.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856287291605002/33.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856309374627870/34.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856320141422622/35.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856335375106058/36.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856350248136704/37.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856368791146566/38.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873856380912697344/39.gif'
          
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
            let ramdonpussy = pussy[Math.floor(Math.random()*pussy.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `**${message.author.username}** mira esa papaya <a:pandanoveo:880306441926352916> `
          
            } else {
      
                desc = `Hey **${img.user.username}**, mira esa papaya que **${message.author.username}** te está mostrando <a:pandanoveo:880306441926352916> `
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonpussy)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}