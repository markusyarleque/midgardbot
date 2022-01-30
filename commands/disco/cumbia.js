module.exports =  {
    
    name: 'cumbia',
    aliases: [],
    description: '🕺',
  
    async execute(client, message, args, Discord) {

        var cumbia = [

            'https://media.discordapp.net/attachments/880918347414380605/883498586841690142/981e0995ba932b34b6fb3db3a7e3904e0d3e778e.gif?width=432&height=332',
            'https://media.discordapp.net/attachments/880918347414380605/883498593829388328/giphy.gif?width=259&height=184',
            'https://media.discordapp.net/attachments/879633476532453386/883512435070337044/mp4_5.gif?width=466&height=466',
            'https://media.discordapp.net/attachments/879633476532453386/883517112965033994/4.gif?width=360&height=202',
            'https://media.discordapp.net/attachments/879633476532453386/883517117809426432/5.gif?width=576&height=306',
            'https://media.discordapp.net/attachments/879633476532453386/883517125283704882/6.gif?width=448&height=205',
            'https://media.discordapp.net/attachments/879633476532453386/883517138776760320/7.gif?width=360&height=202',
            'https://media.discordapp.net/attachments/879633476532453386/883517159593087026/8.gif?width=423&height=243',
            'https://media.discordapp.net/attachments/879633476532453386/883517187598475354/9.gif?width=315&height=315',
            'https://media.discordapp.net/attachments/879633476532453386/883517199636123658/10.gif?width=294&height=226'
        
        ]
        
        var cumbia2 = [

            'https://media.discordapp.net/attachments/880918347414380605/883498600653525012/dance-happy.gif?width=396&height=226',
            'https://media.discordapp.net/attachments/880918347414380605/883498627484491796/DeadYellowishGrizzlybear-size_restricted.gif?width=391&height=225',
            'https://media.discordapp.net/attachments/880918347414380605/883498640407158794/WellinformedImpressiveIndiancow-max-1mb.gif?width=155&height=270',
            'https://media.discordapp.net/attachments/879633476532453386/883509838653571072/mp4_1.gif?width=314&height=562',
            'https://media.discordapp.net/attachments/879633476532453386/883510318112845834/mp4_2.gif?width=538&height=403',
            'https://media.discordapp.net/attachments/879633476532453386/883511614182129674/mp4_3.gif?width=340&height=561',
            'https://media.discordapp.net/attachments/879633476532453386/883512430402097172/mp4_4.gif?width=220&height=162',
            'https://media.discordapp.net/attachments/879633476532453386/883517074146734112/1.gif?width=396&height=484',
            'https://media.discordapp.net/attachments/879633476532453386/883517086876442664/2.gif?width=396&height=396',
            'https://media.discordapp.net/attachments/879633476532453386/883517102856753162/3.gif?width=432&height=317'

        ]

        let img = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        let ramdoncumbia = cumbia[Math.floor(Math.random()*cumbia.length)]
        let ramdoncumbia2 = cumbia2[Math.floor(Math.random()*cumbia2.length)]

        if (!img || img.id === message.author.id) {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`**${message.author.username}** está bailando un pinche cumbión bien loco.`)
            .setImage(ramdoncumbia2)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })
    
        } else if (img.user.bot){
          
            return message.reply({embeds: [
          
                new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RED')
                .setDescription(`<a:Verify2:931463492677017650> | Soy un bot, no bailo! <:nogarsias:932172183453712415>`)
          
            ]})
          
        } else {
    
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Midgard's Disco`,message.guild.iconURL({ dynamic: true }))
            .setDescription(`A **${img.user.username}** y ${message.author.username} les va bien los pasitos de cumbia.`)
            .setImage(ramdoncumbia)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`${message.guild.name}`,'https://media.discordapp.net/attachments/880312288593195028/904603928375726120/Midgard_GIF_AVATAR.gif');
            
            message.channel.send({ embeds: [embed] })
      
        }

    }

}