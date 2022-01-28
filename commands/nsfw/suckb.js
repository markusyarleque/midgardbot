module.exports =  {
    
    name: 'suckb',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var suckb = [

            'https://media.discordapp.net/attachments/853500788848853002/878541008785276948/1.gif?width=450&height=303',
            'https://media.discordapp.net/attachments/853500788848853002/878541034655727686/2.gif?width=405&height=227',
            'https://media.discordapp.net/attachments/853500788848853002/878541048253673512/3.gif?width=328&height=184',
            'https://media.discordapp.net/attachments/853500788848853002/878541050187227136/4.gif?width=450&height=248',
            'https://media.discordapp.net/attachments/853500788848853002/878541060584898580/5.gif?width=270&height=205',
            'https://media.discordapp.net/attachments/853500788848853002/878541073104912415/6.gif?width=558&height=310',
            'https://media.discordapp.net/attachments/853500788848853002/878541081246048286/7.gif?width=360&height=284',
            'https://media.discordapp.net/attachments/853500788848853002/878541091689877504/8.gif?width=363&height=202',
            'https://media.discordapp.net/attachments/853500788848853002/878541101563248680/9.gif?width=324&height=243',
            'https://media.discordapp.net/attachments/853500788848853002/878541108819419156/10.gif?width=378&height=220',
            'https://media.discordapp.net/attachments/853500788848853002/878541121876295730/11.gif?width=450&height=288',
            'https://media.discordapp.net/attachments/853500788848853002/878541133343494144/12.gif?width=450&height=253',
            'https://media.discordapp.net/attachments/853500788848853002/878541147981639761/13.gif?width=405&height=260',
            'https://media.discordapp.net/attachments/853500788848853002/878541157574017084/14.gif?width=360&height=202',
            'https://media.discordapp.net/attachments/853500788848853002/878541174254739456/15.gif?width=450&height=300',
            'https://media.discordapp.net/attachments/853500788848853002/878541184736313364/16.gif?width=450&height=245',
            'https://media.discordapp.net/attachments/853500788848853002/878541193464668220/17.gif?width=450&height=216',
            'https://media.discordapp.net/attachments/853500788848853002/878541203040268288/18.gif?width=432&height=238',
            'https://media.discordapp.net/attachments/853500788848853002/878541217619664936/19.gif?width=570&height=355',
            'https://media.discordapp.net/attachments/853500788848853002/878541225882427402/20.gif?width=358&height=216'
          
        ]
  
        if(!message.channel.nsfw){
          
            return message.reply({embeds: [
  
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/936039644959756319/936524707677741086/prohibido.gif?width=318&height=149')
                .setColor('RED')
                .setDescription(`<a:prohibido:936527618466009109> | ¡Oh rayos, no puedes hacer eso aquí pillín <:ojooo:925928526119571457>`)
  
            ]})
        
        } else {
      
            let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
            let ramdonsuckb = suckb[Math.floor(Math.random()*suckb.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `A **${message.author.username}** le gusta chupar bolas <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${message.author.username}** se está comiendo las pelotas de **${img.user.username}** <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor(`🔞 | Midgard's Hot 🔥`,message.guild.iconURL({ dynamic: true }))
            .setDescription(desc)
            .setImage(ramdonsuckb)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
      
        } 
      
    }
  
}