module.exports =  {
    
    name: 'suck',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var suck = [

            'https://media.discordapp.net/attachments/853500788848853002/878194212930207804/1.gif?width=540&height=382',
            'https://media.discordapp.net/attachments/853500788848853002/878194231620018206/2.gif?width=540&height=440',
            'https://media.discordapp.net/attachments/853500788848853002/878194250595045456/3.gif?width=540&height=350',
            'https://media.discordapp.net/attachments/853500788848853002/878194270081777694/4.gif?width=540&height=348',
            'https://media.discordapp.net/attachments/853500788848853002/878194288171835392/5.gif?width=540&height=287',
            'https://media.discordapp.net/attachments/853500788848853002/878194305691422740/6.gif?width=540&height=471',
            'https://media.discordapp.net/attachments/853500788848853002/878194322246356992/7.gif?width=540&height=366',
            'https://media.discordapp.net/attachments/853500788848853002/878194338419585054/8.gif?width=540&height=374',
            'https://media.discordapp.net/attachments/853500788848853002/878194346145513482/9.gif?width=540&height=367',
            'https://media.discordapp.net/attachments/853500788848853002/878194379926417428/10.gif?width=540&height=371',
            'https://media.discordapp.net/attachments/853500788848853002/878194387660734524/11.gif?width=540&height=379',
            'https://media.discordapp.net/attachments/853500788848853002/878194411702456340/12.gif?width=540&height=383',
            'https://media.discordapp.net/attachments/853500788848853002/878194426755825694/13.gif?width=540&height=371',
            'https://media.discordapp.net/attachments/853500788848853002/878194443574980619/14.gif?width=540&height=386',
            'https://media.discordapp.net/attachments/853500788848853002/878194453469339708/15.gif?width=540&height=379',
            'https://media.discordapp.net/attachments/853500788848853002/878194463279812628/16.gif?width=540&height=324',
            'https://media.discordapp.net/attachments/853500788848853002/878194469407719454/17.gif?width=540&height=298',
            'https://media.discordapp.net/attachments/853500788848853002/878194487573221436/18.gif?width=540&height=356',
            'https://media.discordapp.net/attachments/853500788848853002/878194505063497768/19.gif?width=540&height=354',
            'https://media.discordapp.net/attachments/853500788848853002/878194528597708830/20.gif?width=540&height=387',
            'https://media.discordapp.net/attachments/853500788848853002/878194545647558686/21.gif?width=540&height=354',
            'https://media.discordapp.net/attachments/853500788848853002/878194571081838652/22.gif?width=540&height=354',
            'https://media.discordapp.net/attachments/853500788848853002/878194588202987530/23.gif?width=540&height=354',
            'https://media.discordapp.net/attachments/853500788848853002/878194599800221706/24.gif?width=540&height=366',
            'https://media.discordapp.net/attachments/853500788848853002/878194611439403018/25.gif?width=540&height=304',
            'https://media.discordapp.net/attachments/853500788848853002/878194620885004288/26.gif?width=540&height=328',
            'https://media.discordapp.net/attachments/853500788848853002/878194635103682580/27.gif?width=540&height=315',
            'https://media.discordapp.net/attachments/853500788848853002/878194651423727666/28.gif?width=540&height=419',
            'https://media.discordapp.net/attachments/853500788848853002/878194660470816788/29.gif?width=540&height=373',
            'https://media.discordapp.net/attachments/853500788848853002/878194667911520266/30.gif?width=540&height=370',
            'https://media.discordapp.net/attachments/853500788848853002/878194678342770698/31.gif?width=540&height=310',
            'https://media.discordapp.net/attachments/853500788848853002/878194700841000980/32.gif?width=540&height=323',
            'https://media.discordapp.net/attachments/853500788848853002/878194709539999754/33.gif?width=540&height=388',
            'https://media.discordapp.net/attachments/853500788848853002/878194731681710080/34.gif?width=540&height=354',
            'https://media.discordapp.net/attachments/853500788848853002/878194739193716736/35.gif?width=540&height=292',
            'https://media.discordapp.net/attachments/853500788848853002/878194749629136966/36.gif?width=540&height=282',
            'https://media.discordapp.net/attachments/853500788848853002/878194763604570112/37.gif?width=540&height=348',
            'https://media.discordapp.net/attachments/853500788848853002/878194766796427304/38.gif?width=540&height=424',
            'https://media.discordapp.net/attachments/853500788848853002/878194784240553984/39.gif?width=540&height=346',
            'https://media.discordapp.net/attachments/853500788848853002/878194797280632852/40.gif?width=540&height=381'
          
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