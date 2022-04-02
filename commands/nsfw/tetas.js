module.exports =  {
    
  name: 'tetas',
  aliases: ['boobs'],
  description: '🔞 Comandos NSFW.',
  
  async execute(client, message, args, Discord) { 

    var tetas = [

      'https://media.discordapp.net/attachments/853500788848853002/873742099470749696/1.gif?width=319&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742106026442792/2.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742111554547722/3.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742114566053928/4.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742117812441088/5.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742121033670657/6.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742123546050590/7.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742126620500018/8.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742125676785665/9.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742127765532752/10.gif?width=315&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873744098589302784/11.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744101793755146/12.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744108634636288/13.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744110798905444/14.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744118927482900/15.gif?width=323&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742152063135774/16.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742159751315526/17.gif?width=281&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742156387475476/18.gif?width=315&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742161043148820/19.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742161894584370/20.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742168806809630/22.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742173437308968/23.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742178009116672/24.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742181649747978/25.gif?width=315&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873744423832408134/26.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744434158776320/27.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744440953544734/28.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744453289000990/29.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873744461300121631/30.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742202176675850/31.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742204827500544/32.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742205796360192/33.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742207717347328/34.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742212238815282/35.gif?width=312&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742211613863986/36.gif?width=315&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742216655421511/37.gif?width=309&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742217259405312/38.gif',
      'https://media.discordapp.net/attachments/853500788848853002/873742217414606858/39.gif?width=309&height=562',
      'https://media.discordapp.net/attachments/853500788848853002/873742218379292712/40.gif',
      'https://www.gifs-porno.com/wp-content/uploads/2019/07/Follando-con-Gabbie-Carter.gif'
          
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
      let ramdontetas = tetas[Math.floor(Math.random()*tetas.length)]
      let desc

      while (!ramdontetas || ramdontetas === null || ramdontetas === '' || ramdontetas === undefined) {
        
        ramdontetas = tetas[Math.floor(Math.random()*tetas.length)]
        
      }
  
      if (!img || img.id===message.author.id || img.user.bot) {
    
        desc = `**${message.author.username}** mira estos melones <a:pandanoveo:880306441926352916> `
        
      } else {
    
        desc = `**${message.author.username}**, mira los melones que tiene **${img.user.username}** <a:pandanoveo:880306441926352916> `

      }

      const embed = new Discord.MessageEmbed()
      .setAuthor({ name: `🔞 | Midgard's Hot 🔥`, iconURL: message.guild.iconURL() ? message.guild.iconURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true }) })
      .setDescription(desc)
      .setImage(ramdontetas)
      .setColor('RANDOM')
      .setTimestamp(new Date())
      .setFooter({ text: `${message.guild.name}`, iconURL: 'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif' })

      message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] }).catch((e) => console.log('Error al enviar mensaje: '+e))
    
    } 
    
  }

}