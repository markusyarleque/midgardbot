module.exports =  {
    
    name: 'culo',
    aliases: ['ass','trasero'],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var culo = [

            'https://media.discordapp.net/attachments/853500788848853002/873866479802654780/1.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866484596756520/2.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866491156656138/3.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866516423122944/4.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866524258086942/5.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866527668064266/6.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866541832241192/7.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866544327831562/8.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866554801000468/9.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866560673046549/10.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866567685926962/11.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866582156255252/12.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866588791635998/13.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866592474255420/14.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866599789129738/15.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866610211962930/16.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866617791074354/17.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866636166307850/18.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866644089368586/19.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866655074222110/20.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866667640381470/21.gif?width=316&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866670106636338/22.gif?width=507&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866678700736512/23.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866686586052608/24.gif?width=316&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866696019038208/25.gif', 
            'https://media.discordapp.net/attachments/853500788848853002/873866707830198272/26.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866715853881384/27.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866723143602206/28.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866732513689600/29.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866744916234240/30.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866759655014460/31.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866771155787816/32.gif?width=582&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866778688774204/33.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866796984311839/34.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866804181729340/35.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866814378094692/36.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866822028517416/37.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866822183714816/38.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866836956028939/39.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866843310415902/40.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866852328173588/41.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866856077856768/42.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866869944242216/43.gif?width=287&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866881092694067/44.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866892018864138/45.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866902773043232/46.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866915733450802/47.gif?width=428&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866927318138890/48.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866937535438888/49.gif?width=281&height=562',
            'https://media.discordapp.net/attachments/853500788848853002/873866953498964008/50.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866968405524510/51.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866983572115456/52.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873866992409518120/53.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873867005772562452/54.gif',
            'https://media.discordapp.net/attachments/853500788848853002/873867010344382504/55.gif'
          
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
            let ramdonculo = culo[Math.floor(Math.random()*culo.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `**${message.author.username}** mira ese perro culazo <a:pandanoveo:880306441926352916> `
          
            } else {
      
                desc = `Omg!!! **${message.author.username}** mira ese perro culazo que tiene **${img.user.username}** <a:pandanoveo:880306441926352916> `
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `🔞 | Midgard's Hot 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
            .setDescription(desc)
            .setImage(ramdonculo)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })
            
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
      
        } 
      
    }
  
}