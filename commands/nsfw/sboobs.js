module.exports =  {
    
    name: 'sboobs',
    aliases: [],
    description: '🔞 Comandos NSFW.',
    
    async execute(client, message, args, Discord) { 
  
        var sboobs = [

            'https://media.discordapp.net/attachments/853500788848853002/878543079395713034/1.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543091630506034/2.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543104817369118/3.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543125499482172/4.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543130301960212/5.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543148668825610/6.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543161285292052/7.gif?width=387&height=218',
            'https://media.discordapp.net/attachments/853500788848853002/878543173008371792/8.gif?width=432&height=230',
            'https://media.discordapp.net/attachments/853500788848853002/878543189462634526/9.gif?width=301&height=208',
            'https://media.discordapp.net/attachments/853500788848853002/878543199432491018/10.gif?width=450&height=230',
            'https://media.discordapp.net/attachments/853500788848853002/878543207028387840/11.gif?width=405&height=228',
            'https://media.discordapp.net/attachments/853500788848853002/878543213252739093/12.gif?width=270&height=191',
            'https://media.discordapp.net/attachments/853500788848853002/878543224585744404/13.gif?width=450&height=222',
            'https://media.discordapp.net/attachments/853500788848853002/878543231527313468/14.gif?width=450&height=255',
            'https://media.discordapp.net/attachments/853500788848853002/878543244533829642/15.gif?width=450&height=430',
            'https://media.discordapp.net/attachments/853500788848853002/878543253375426560/16.gif?width=355&height=299',
            'https://media.discordapp.net/attachments/853500788848853002/878543261357195314/17.gif?width=450&height=243',
            'https://media.discordapp.net/attachments/853500788848853002/878543270806970368/18.gif?width=360&height=360'
          
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
            let ramdonsboobs = sboobs[Math.floor(Math.random()*sboobs.length)]
            let desc 
    
            if (!img || img.id===message.author.id || img.user.bot) {
      
                desc = `**${message.author.username}** está chupando tetas <a:sabroso:880695816497541180>`
          
            } else {
      
                desc = `**${img.user.username}**, **${message.author.username}** te está chupando los melones que tienes <a:sabroso:880695816497541180>.`
  
            }
  
            const embed = new Discord.MessageEmbed()
            .setAuthor(`🔞 | Midgard's Hot 🔥`,message.guild.iconURL({ dynamic: true }))
            .setDescription(desc)
            .setImage(ramdonsboobs)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
        
            message.reply({ allowedMentions: { repliedUser: false}, embeds: [embed] });
      
        } 
      
    }
  
}